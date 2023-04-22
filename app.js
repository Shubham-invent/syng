const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
const apiRouter = require("./routes/api");
const apiResponse = require("./helpers/apiResponse");

const sanitizeRequest = require("./middlewares/sanitizeRequest");
const addHeaders = require("./middlewares/addHeaders");
const compression = require("compression");
const cors = require("cors");
const sequelize = require("./bin/sequelize");

const bodyParser = require("body-parser");
const Sentry = require("@sentry/node");
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2");
const { OauthUsers } = require("./models/OrganizationModel");
const {
  NODE_ENV,
  REDIS_CACHE_HOSTNAME,
  REDIS_PASSWORD,
  SQL_DB_URL,
  OAUTH2_AUTHORIZATION_URL,
  OAUTH2_CALLBACK_URL,
  OAUTH2_CLIENT_ID,
  OAUTH2_CLIENT_SECRET,
  OAUTH2_TOKEN_URL,
  SESSION_SECRET,
} = require("./constant");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "google",
  new OAuth2Strategy(
    {
      authorizationURL: OAUTH2_AUTHORIZATION_URL,
      tokenURL: OAUTH2_TOKEN_URL,
      clientID: OAUTH2_CLIENT_ID,
      clientSecret: OAUTH2_CLIENT_SECRET,
      callbackURL: OAUTH2_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      // Verify the access token and fetch the organization info from the database
      try {
        console.log("profile", profile);
        console.log("accessToken", accessToken);
        const oauthUsers = await OauthUsers.findOne({
          where: { id: profile.id },
        });
        if (!oauthUsers) {
          OauthUsers.create({
            id: profile.id,
            email: profile.email,
          });
        }
        throw new Object(
          "Access Token is" +
            "->" +
            accessToken +
            " use it in subsequent request"
        );
      } catch (error) {
        done(error);
      }
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/signup",
    failureRedirect: "/failed",
  })
);

Sentry.init({
  dsn: "https://ec2c4f63816c492abd30c8e92569dc61@o4503909480267776.ingest.sentry.io/4503909483085824",
  tracesSampleRate: 1.0,
});

const helmet = require("helmet");

const rateLimit = require("express-rate-limit");
const isAuthenticated = require("./middlewares/isAuthenticated");

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // limit each IP to 100 requests per windowMs
});

// DB connection

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.log("Unable to connect to database", err);
  });

//  apply to all requests
const corsOpts = {
  origin: [
    "http://localhost:3000",
    "https://localhost:3000",
    "https://syngenta.syngenta.com",
  ],

  methods: ["GET", "POST", "OPTIONS"],

  allowedHeaders: [
    "Content-Type",
    "authorization",
    "cache-control",
    "baggage",
    "sentry-trace",
  ],
};
app.use(cors(corsOpts));
app.use(limiter);

app.use(compression());

helmet.hidePoweredBy();
app.use(helmet());

//don't show the log when it is test
if (NODE_ENV !== "test") {
  app.use(logger("dev"));
}

app.use(bodyParser.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(addHeaders);

//To allow cross-origin requests
app.use(isAuthenticated);
app.use(sanitizeRequest);
const whiteListApi = {
  "/api/signUp": true,
};

const cacheFunction = (req, res) => {
  return !whiteListApi[req.originalUrl] && res.statusCode === 200;
};
// const apiCacheMiddleWare = apicache.options({
//   appendKey: (req, res) => req.originalUrl + req.email,
//   headers: {
//     "cache-control": "no-cache",
//   },
// }).middleware;
// app.use(apiCacheMiddleWare("5 minutes", cacheFunction));
//Route Prefixes
// upload.single("rawFile")

app.use("/api/", apiRouter);

// throw 404 if URL not found
app.all("*", function (req, res) {
  return apiResponse.notFoundResponse(req, res, "Page not found");
});

app.use((err, req, res) => {
  if (err.name == "UnauthorizedError") {
    return apiResponse.unauthorizedResponse(req, res, err.message);
  }
});
app.use((err, req, res) => {
  console.log("req", req);
  console.log("res", res);
});
module.exports = app;
