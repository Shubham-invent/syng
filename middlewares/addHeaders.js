const addHeaders = async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("X-Powered-By", "nginx");
  next();
};

module.exports = addHeaders;
