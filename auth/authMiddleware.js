const {
  getUserIDFromBearerToken,
  getUserRoleFromDatabase,
} = require("../db/pgWrapper");

// Middleware function to check the user's role based on the access token
function checkUserRole(req, res, next) {
  const bearerToken = req.headers.authorization;

  // Retrieve the user's role based on the bearer token
  getUserIDFromBearerToken(bearerToken, (userID) => {
    if (userID) {
      // Use the userID to fetch the user's role from your database
      getUserRoleFromDatabase(userID, (userRole) => {
        if (userRole) {
          req.userRole = userRole;
          console.log(`User role for user ID ${userID}: ${userRole}`);
          next();
        } else {
          res.status(401).json({ message: "Unauthorized" });
        }
      });
    } else {
      // Invalid token or user not found
      res.status(401).json({ message: "Unauthorized" });
    }
  });
}

module.exports = checkUserRole;
