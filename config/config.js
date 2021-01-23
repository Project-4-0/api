require("dotenv").config();
const creds = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: "postgresql",
    dialectOptions: {
      ssl: {
        require: false,
        rejectUnauthorized: true,
      },
    },
    define: {
      timestamps: true,
    },
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: "postgresql",
    dialectOptions: {
      ssl: {
        require: false,
        rejectUnauthorized: true,
      },
    },
    define: {
      timestamps: true,
    },
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: "postgresql",
    dialectOptions: {
      ssl: {
        require: false,
        rejectUnauthorized: true,
      },
    },
  },
  define: {
    timestamps: true,
  },
};

module.exports = creds;
