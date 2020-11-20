const { Promise } = require("mongoose");
const { resolve } = require("path");
const validator = require("validator");
const User = require("./models/userModel");

const signin = function (err, req) {
  if (!validator.isEmail(req.body.email)) {
    err["email"] = "use valid email";
  }
};

exports.validSign = async function (err, req) {
  return new Promise(function (resolve, reject) {
    signin(err, req);
    return User.findOne({ email: req.body.email }).then((u) => {
      if (u == null) {
        err["email"] = "email not exits";
      }
      resolve(err);
    });
  });
};

exports.validReg = async function (err, req) {
  return new Promise(function (resolve, reject) {
    signin(err, req);
    return User.findOne({ email: req.body.email }).then((u) => {
      if (u != null) {
        err["email"] = "email  exits";
      }
      resolve(err);
    });
  });
};
