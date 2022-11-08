require("dotenv").config();
const express = require("express");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const productRouter = require("../routes/products");
const userRouter = require("../routes/users");
const authRouter = require("../routes/auth");
const { prisma, userRepository } = require("../repository/repository");
const store = new session.MemoryStore();
const LocalStrategy = require("passport-local").Strategy;

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    // cookie: {
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // },
    secret: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    // store: new PrismaSessionStore(prisma, {
    //   checkPeriod: 2 * 60 * 1000,
    //   dbRecordIdIsSessionId: true,
    //   dbRecordIdFunction: undefined,
    // }),
    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());
// app.use(passport.authenticate("session"));

app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   db.users.findById(id, function (err, user) {
//     if (err) {
//       return done(err);
//     }
//     done(null, user);
//   });
// });

// passport.use(
//   new LocalStrategy(function (username, password, done) {
//     console.log("password strategy");
//     let user;
//     try {
//       user = userRepository.getUserByEmail(username);
//       if (!user) {
//         console.log("user not found");
//         return done(null, false, { message: "User email not found" });
//       }
//       console.log("found user");
//     } catch (err) {
//       console.log("problem finding user");
//       return done(err);
//     }

//     if (password != user.password) {
//       return done(null, false, { message: "Incorrect email or password" });
//     }
//     return done(null, user);
//   })
// );

// app.post(
//   "/login",
//   (req, res, next) => {
//     console.log(req.body);
//     next();
//   },
//   passport.authenticate("local", { failureRedirect: "/login" }),
//   (req, res) => {
//     res.redirect("profile");
//   }
// );

module.exports = app;
