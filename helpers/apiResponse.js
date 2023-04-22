exports.asIsResponse = function (req, res, data) {
  return res?.status(200).json(data);
};

exports.successResponse = function (req, res, msg) {
  var data = {
    status: 1,
    message: msg,
  };

  return res?.status(200).json(data);
};

exports.successResponseWithData = function (req, res, msg, data) {
  var resData = {
    status: 1,
    message: msg,
    data: data,
  };

  return res?.status(200).json(resData);
};

exports.ErrorResponse = function (req, res, msg) {
  var data = {
    status: 0,
    message: msg,
  };

  return res?.status(500).json(data);
};

exports.notFoundResponse = function (req, res, msg) {
  var data = {
    status: 0,
    message: msg,
  };
  return res?.status(404).json(data);
};

exports.validationErrorWithData = function (req, res, msg, data) {
  var resData = {
    status: 0,
    message: msg,
    data: data,
  };

  return res?.status(400).json(resData);
};

exports.unauthorizedResponse = function (req, res, msg) {
  var data = {
    status: 0,
    message: msg,
  };

  return res?.status(401).json(data);
};

exports.userNotApproved = function (req, res, msg) {
  var data = {
    status: 0,
    message: msg,
  };

  return res?.status(402).json(data);
};
