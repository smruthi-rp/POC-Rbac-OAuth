let userDB;

module.exports = (injectedUserDB) => {
  userDB = injectedUserDB;

  return {
    registerUser,
    login,
    getAllUsers,
    deleteUser,
    getUserById,
  };
};

function registerUser(req, res) {
  // Check the user's role here
  if (req.userRole !== "admin") {
    res.status(403).json({ message: "Access denied for this role" });
    return;
  }

  userDB.isValidUser(req.body.username, (error, isValidUser) => {
    if (error || !isValidUser) {
      const message = error
        ? "Something went wrong!"
        : "This user already exists!";

      sendResponse(res, message, error);

      return;
    }

    userDB.register(
      req.body.username,
      req.body.password,
      req.body.role,
      (response) => {
        sendResponse(
          res,

          response.error === undefined ? "Success!!" : "Something went wrong!",
          response.error
        );
      }
    );
  });
}

function login(query, res) {}

function getAllUsers(req, res) {
  if (req.userRole !== "admin") {
    res.status(403).json({ message: "Access denied for this role" });
    return;
  }
  userDB.getAllUsers((error, users) => {
    if (error) {
      res.status(500).json({ message: "Internal server error" });
      return;
    }
    res.json(users);
  });
}
function deleteUser(req, res) {
  if (req.userRole !== "admin") {
    return res.status(403).json({ message: "Access denied for this role" });
  }
  const userIdToDelete = req.params.userId;

  userDB.deleteUser(userIdToDelete, (error) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Failed to delete user", error: error });
    }
    res.status(200).json({ message: "User deleted successfully" });
  });
}

function getUserById(req, res) {
  const requestedUserId = req.params.userId;
  const bearerToken = req.headers.authorization;
  const { getUserIDFromBearerToken } = require("../db/pgWrapper");
  getUserIDFromBearerToken(bearerToken, (authenticatedUserId) => {
    if (requestedUserId != authenticatedUserId) {
      return res.status(403).json({ message: "Access denied" });
    }
    userDB.getUserById(requestedUserId, (error, user) => {
      if (error) {
        return res.status(500).json({ message: "Internal server error" });
      }
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    });
  });
}

function sendResponse(res, message, error) {
  res.status(error !== undefined ? 400 : 200).json({
    message: message,
    error: error,
  });
}
