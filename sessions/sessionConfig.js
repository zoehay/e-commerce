const { Pool } = require("pg");
const pgSession = require("connect-pg-simple")(session);

const pgSessionDB = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const store = new pgSession({
  pool: pgSessionDb,
  tableName: "sessions",
  createTableIfMissing: true,
});

const sessionConfig = {
  secret: process.env.KEY,
  store: store,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 300000000, sameSite: true, secure: false },
};

module.exports = sessionConfig;
