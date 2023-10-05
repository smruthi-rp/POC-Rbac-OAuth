const Pool = require("pg").Pool;

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "grail_temp",
  password: "",
  port: 5432,
});

// Function to get user ID from bearer token
function getUserIDFromBearerToken(bearerToken, callback) {
  console.log("Querying for token:", bearerToken);
  // const queryToken = bearerToken.replace("Bearer ", "");
  //const bearerToken = req.headers.authorization;
  const query = `SELECT user_id FROM access_tokens WHERE access_token = '${bearerToken}'`;

  try {
    pool.query(query, (error, results) => {
      if (error) {
        console.error("Error while querying the database:", error);
        callback(null);
      } else {
        if (results.rows.length > 0) {
          const userID = results.rows[0].user_id;
          console.log("UserID found:", userID);
          callback(userID);
        } else {
          console.log("UserID not found for the given token.");
          callback(null);
        }
      }
    });
  } catch (err) {
    console.error("An error occurred:", err);
    callback(null);
  }
}

// Function to get user role from user ID
function getUserRoleFromDatabase(userID, callback) {
  const query = `SELECT role FROM users WHERE id = '${userID}'`;
  pool.query(query, (error, results) => {
    if (error) {
      callback(null);
    } else {
      const userRole = results.rows.length > 0 ? results.rows[0].role : null;
      callback(userRole);
    }
  });
}

// Original code for executing queries
function query(queryString, cbFunc) {
  pool.query(queryString, (error, results) => {
    cbFunc(setResponse(error, results));
  });
}

function setResponse(error, results) {
  return {
    error: error,
    results: results ? results : null,
  };
}

module.exports = {
  query,
  getUserIDFromBearerToken,
  getUserRoleFromDatabase,
};
