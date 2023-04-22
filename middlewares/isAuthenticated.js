const apiResponse = require("../helpers/apiResponse");

const { default: axios } = require("axios");
const exludedAPIpaths = ["/auth/google"];
const { OauthUsers } = require("../models/OrganizationModel");

const isAuthenticated = async (req, res, next) => {
  console.log("req log req.body recieved", req.body);
  console.log("path of url", req.originalUrl);
  for (let i = 0; i < exludedAPIpaths.length; i++) {
    if (req.originalUrl.includes(exludedAPIpaths[i])) {
      next();
    }
  }
  const googleUserRes = await axios.get(
    "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" +
      req.body.accessToken
  );
  console.log("googleUserRes", googleUserRes);
  const oauthUser = OauthUsers.findOne({
    id: googleUserRes.user_id,
  });
  if (oauthUser) {
    next();
  }
  apiResponse.ErrorResponse("Unauthorized");
};

module.exports = isAuthenticated;
