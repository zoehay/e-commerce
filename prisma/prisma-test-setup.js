import { exec } from "child_process";
import { fileURLToPath } from "url";
import { setDefaultResultOrder } from "dns";

// fix for 'How to fix "__dirname is not defined in ES module scope"'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prismaBinary = path.join(
  __dirname,
  "..",
  "node_modules",
  ".bin",
  "prisma"
);

const DB_URL =
  "postgresql://postgres:postgres@localhost:5432/prisma_e_commerce?schema=test";
process.env.DB_URL = DB_URL;
this.global.process.env.DB_URL = DB_URL;

const setup = async () => {
  console.log("setup");
  await exec(
    `${prismaBinary} migrate reset --schema=../prisma/test.schema.prisma`
  );
  await exec(`${prismaBinary} db push --schema=./prisma/test.schema.prisma`);
};

module.exports = { setup };
