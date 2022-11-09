const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const router = express.Router();
const { userRepository } = require("../repository/repository");

// Passport Auth
passport.use(
  "password",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    console.log("password strategy");
    let user;
    try {
      user = await userRepository.getUserByEmail(email);
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

// Auth Routes
router.get("/login", (req, res, next) => {
  console.log("loginpage");
  res.status(200).json({ message: "login page" });
});

router.post(
  "/login",
  passport.authenticate("password", {
    failureRedirect: "/auth/login",
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect(`/users/${req.user.id}`);
  }
);

router.post("/register", async (req, res) => {
  const { email, userName, password } = req.body || undefined;
  if (!email || !password) {
    console.log("Email and password required");
    return res.redirect("/auth/register");
  }
  try {
    const existingUser = await userRepository.getUserByEmail(email);
    if (existingUser) {
      console.log("User with email already exists");
      return res.redirect("/auth/login");
    }

    const user = await userRepository.createUser(email, userName, password);
    res.redirect(`/users/${user.id}`);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/auth/login");
  });
});

module.exports = router;
