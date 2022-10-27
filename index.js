const express = require("express");
const { Prisma, PrismaClient } = require("@prisma/client");
//require('dotenv').config();
const productRoutes = require("./routes/products");

const app = express();
export const prisma = new PrismaClient();
const port = process.env.PORT || 8000;

app.use("/products", productRoutes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
