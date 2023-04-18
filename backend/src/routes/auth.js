const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const authRouter = express.Router();
const { userRepository } = require("../repository/repository");

// #TODO: error messages for auth
const checkAuthorization = (req, res, next) => {
  if (!req.user?.id) {
    return res.status(401).json({ message: "No user" });
  } else {
    next();
  }
};

const checkAdmin = (req, res, next) => {
  if (req.user.isAdmin == false) {
    return res.status(401).json({ message: "Not authorized" });
  } else {
    console.log("authorized");
    next();
  }
};

// Passport Auth
passport.use(
  "password",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    let user;
    try {
      user = await userRepository.getUserByEmail(email);
      if (!user) {
        console.log("user not found");
        // return done(null, false, { message: "User email not found" });
        return done(null, false);
      }
      console.log("found user");
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect email or password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
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

authRouter.get("/login", (req, res, next) => {
  console.log("loginpage");
  res.status(200).json({ message: "login page" });
});

authRouter.post(
  "/login",
  passport.authenticate("password", {
    successRedirect: "/user",
    failureRedirect: "/auth/login",
    failureFlash: true,
  }),
  async (req, res) => {
    if (req.user) {
      const user = await userRepository.getUserById(req.user.id);
      res.status(200).json({ user });
    } else {
      console.log("no user");
    }
  }
);

authRouter.post("/register", async (req, res) => {
  const { email, userName, password } = req.body || undefined;
  if (!email || !password) {
    console.log("Email and password required");
    return res.sendStatus(302);
  }
  try {
    // check if already registered
    const existingUser = await userRepository.getUserByEmail(email);
    if (existingUser) {
      console.log("User with email already exists");
      return res.sendStatus(302);
    }
    // create user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await userRepository.createUser(
      email,
      userName,
      hashedPassword
    );
    // TODO: fix redirect
    res.send(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

authRouter.post("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: "User logged out" });
  });
});

module.exports = { authRouter, checkAuthorization, checkAdmin };
