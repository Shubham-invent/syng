const exludedAPIpaths = ["/api/signUp", "/api/sendQuery", "/api/hello"];
const sanitizeRequest = async (req, res, next) => {
  console.log("req log req.body", req.body);
  console.log("path of url", req.originalUrl);
  if (!exludedAPIpaths.includes(req.originalUrl)) {
    if (req.body.fileName) {
      req.body.fileName = req.body.fileName.split(" ").join("_");
      console.log("fileName sanitized", req.body.fileName);
    }
  }

  next();
};

module.exports = sanitizeRequest;
