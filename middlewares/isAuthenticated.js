const apiResponse = require("../helpers/apiResponse");

const axios = require("axios");
const exludedAPIpaths = "/auth/google";
const { OauthUsers } = require("../models/OrganizationModel");

const isAuthenticated = (req, res, next) => {
  try {
    console.log("req log req.body recieved", req.body.accessToken);
    console.log("path of url", req.originalUrl);

    if (req.originalUrl.includes(exludedAPIpaths)) {
      next();
    }
    const getData = async () => {
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" +
          req.body.accessToken
      );
      return response;
    };
    const validateUser = async () => {
      const googleUserRes = await getData();
      console.log("googleUserRes", googleUserRes);
      const oauthUser = await OauthUsers.findOne({
        id: googleUserRes.user_id,
      });
      if (oauthUser) {
        console.log("authenticated");
        next();
      }
    };
    validateUser();
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = isAuthenticated;
