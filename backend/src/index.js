require("dotenv").config();
const app = require("./app");
const { prisma } = require("./repository/repository");
const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(
    `App listening at http://localhost:${port}`,
    process.env.CORS_ALLOW_ORIGIN
  );
});

const SHUTDOWN_TIMEOUT_MS = 10000;
let shuttingDown = false;

async function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`${signal} received, shutting down gracefully`);

  const forceExit = setTimeout(() => {
    console.error("Shutdown timed out, forcing exit");
    process.exit(1);
  }, SHUTDOWN_TIMEOUT_MS);
  forceExit.unref();

  try {
    await new Promise((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
    server.closeIdleConnections();
    console.log("HTTP server closed");

    await prisma.$disconnect();
    console.log("Database connection closed");

    clearTimeout(forceExit);
    process.exit(0);
  } catch (err) {
    console.error("Error during shutdown", err);
    process.exit(1);
  }
}

["SIGTERM", "SIGINT"].forEach((signal) => {
  process.on(signal, () => shutdown(signal));
});
