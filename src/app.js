require("dotenv").config();
const express = require("express");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const productRouter = require("../routes/products");
const userRouter = require("../routes/user");
const { authRouter } = require("../routes/auth");
const cartRouter = require("../routes/cart");
const { prisma, userRepository } = require("../repository/repository");

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    secret: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/user", userRouter);
app.use("/cart", cartRouter);

module.exports = app;
