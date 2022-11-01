const path = require("path");
const { defaults } = require("jest-config");

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  // preset: "jest",
  moduleFileExtensions: [...defaults.moduleFileExtensions, "mjs"],
  testEnvironment: path.join(
    __dirname,
    "prisma",
    "prisma-test-environment.mjs"
  ),
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
};

module.exports = config;
