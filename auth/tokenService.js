let userDB;
let tokenDB;

module.exports = (injectedUserDB, injectedTokenDB) => {
  userDB = injectedUserDB;
  tokenDB = injectedTokenDB;

  return {
    getClient,
    saveAccessToken,
    getUser,
    grantTypeAllowed,
    getAccessToken,
  };
};

function getClient(clientID, clientSecret, cbFunc) {
  if (clientID === "validClientID" && clientSecret === "validClientSecret") {
    const client = {
      clientID: "validClientID",
      clientSecret: "validClientSecret",
    };
    cbFunc(null, client);
  } else {
    cbFunc(new Error("Invalid client credentials"));
  }
}

function grantTypeAllowed(clientID, grantType, cbFunc) {
  cbFunc(false, true);
}

function getUser(username, password, cbFunc) {
  userDB.getUser(username, password, cbFunc);
}

function saveAccessToken(accessToken, clientID, expires, user, cbFunc) {
  tokenDB.saveAccessToken(accessToken, user.id, cbFunc);
}

function getAccessToken(bearerToken, cbFunc) {
  // Retrieve the user's ID based on the bearer token
  tokenDB.getUserIDFromBearerToken(bearerToken, (userID) => {
    if (userID) {
      // Use the userID to fetch the user's role from your database
      const userRole = getUserRoleFromDatabase(userID);

      // Set the user's role in the access token response
      const accessToken = {
        user: {
          id: userID,
          role: userRole, // Include the user's role in the access token
        },
        expires: null,
      };

      cbFunc(userID === null, userID === null ? null : accessToken);
    } else {
      // Invalid token or user not found
      res.status(401).json({ message: "Unauthorized" });
    }
  });
}
