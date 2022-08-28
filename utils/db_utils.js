const path = require("path");
const envPath = path.join(__dirname, "../.env");
const dotenv = require("dotenv").config({ path: envPath });

if (dotenv.error) {
  throw result.error;
}

const db_URI = dotenv?.parsed.DB_URI;

module.exports = {
  db_URI,
};
