const express = require("express");
const productRouter = require("../routes/products");

const app = express();

app.use(express.json());

app.use("/products", productRouter);

module.exports = app;
