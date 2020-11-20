const express = require("express");
const User = require("../models/userModel");
const { getToken } = require("../utility");
const { validSign, validReg } = require("../validator");
const { isEmpty } = require("lodash");
const bycrypt = require("bcrypt");

const router = express.Router();

// router.put("/:id", isAuth, async (req, res) => {
//   const userId = req.params.id;
//   const user = await User.findById(userId);
//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     user.password = req.body.password || user.password;
//     const updatedUser = await user.save();
//     res.send({
//       _id: updatedUser.id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//       token: getToken(updatedUser),
//     });
//   } else {
//     res.status(404).send({ message: "User Not Found" });
//   }
// });

router.post("/signin", async (req, res) => {
  let err = {};

  validSign(err, req).then((err) => {
    if (!isEmpty(err)) {
      res.send({ message: err });
    } else {
      User.findOne({
        email: req.body.email,
      }).then(async (signinUser) => {
        console.log("userrr", signinUser);
        const log = await bycrypt.compare(
          req.body.password,
          signinUser.password
        );
        if (log) {
          console.log("signin in nodejs");
          res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser),
          });
        } else {
          err["password"] = "invalid password";
          console.log("from hereeree");
          res.send({ message: err });
        }
      });
    }
  });

  /////////////////////////
  // const signinUser = await User.findOne({
  //     email: req.body.email,
  //     password: req.body.password,
  //   });
  //   console.log(signinUser);
  //   if (signinUser) {
  //     console.log("signin in nodejs");
  //     res.send({
  //       _id: signinUser.id,
  //       name: signinUser.name,
  //       email: signinUser.email,
  //       isAdmin: signinUser.isAdmin,
  //       token: getToken(signinUser),
  //     });
  //   } else {
  //     console.log("from hereeree");
  //     res.send({ message: "Invalid Email or Password." });
  //   }
});

router.post("/register", async (req, res) => {
  const salt = await bycrypt.genSalt(10);
  const pss = await bycrypt.hash(req.body.password, salt);

  let err = {};

  validReg(err, req).then((err) => {
    if (!isEmpty(err)) {
      res.send({ message: err });
    } else {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: pss,
      });

      user.save().then(async (newUser) => {
        if (newUser) {
          res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser),
          });
        } else {
          res.status(401).send({ message: err });
        }
      });
    }
  });
});

router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "Basir",
      email: "admin@example.com",
      password: "1234",
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ message: error.message });
  }
});

module.exports = router;
