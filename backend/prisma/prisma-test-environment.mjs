// @ts-check
import path from "path";
import fs from "fs";
import { nanoid } from "nanoid";
import { TestEnvironment } from "jest-environment-node";
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

class PrismaTestEnvironment extends TestEnvironment {
  /** @type {import('@jest/types').Config.ProjectConfig} */

  constructor(config, _context) {
    super(config, _context);
    const DB_URL =
      "postgresql://postgres:postgres@localhost:5432/prisma_e_commerce?schema=test";
    process.env.DB_URL = DB_URL;
    this.global.process.env.DB_URL = DB_URL;
  }

  async setup() {
    console.log("setup");
    //TODO: figure out how to run database seed before each test, Jest does not support asynchronous setup files
    await exec(
      `${prismaBinary} migrate reset --schema=../prisma/test.schema.prisma`
    );
    // await exec(`${prismaBinary} db push --schema=./prisma/test.schema.prisma`);
    // await exec(`${prismaBinary} db seed`);
    return super.setup();
  }

  async teardown() {
    try {
      // await fs.promises.unlink(this.dbPath)
    } catch (error) {
      // doesn't matter as the environment is torn down
    }
  }
}

export default PrismaTestEnvironment;
