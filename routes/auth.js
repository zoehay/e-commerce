const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const router = express.Router();
const { userRepository } = require("../repository/repository");

passport.use(
  "password",
  new LocalStrategy(async function (username, password, done) {
    console.log("password strategy");
    let user;
    try {
      user = await userRepository.getUserByEmail(username);
      if (!user) {
        console.log("user not found");
        return done(null, false, { message: "User email not found" });
      }
      console.log("found user");
    } catch (err) {
      console.log("problem finding user");
      return done(err);
    }

    if (password != user.password) {
      return done(null, false, { message: "Incorrect email or password" });
    }
    return done(null, user);
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userRepository.getUserById(id);
    if (!user) {
      return done(new Error("User not found"));
    }
    done(null, user);
  } catch (err) {
    done(err);
  }
});

router.get("/login", (req, res, next) => {
  console.log("loginpage");
  next();
});

router.post(
  "/login/password",
  function (req, res, next) {
    console.log("password page");
    console.log(req.body);
    next();
  },
  passport.authenticate("password", {
    successRedirect: "/users",
    failureRedirect: "/login",
    failureMessage: true,
  }),
  function (req, res) {
    console.log("done");
    res.redirect("/users");
  }
);

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// router.post(
//   "/login",
//   passport.authenticate("local"),
//   function (req, res, next) {
//     res.redirect(`users/${req.user.id}`);
//   }
// );

module.exports = router;
