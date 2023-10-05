module.exports = (router, app, authenticator) => {
  const checkUserRole = require("./authMiddleware");
  router.post("/register", checkUserRole, authenticator.registerUser);
  router.post("/login", app.oauth.grant(), authenticator.login);
  router.get("/getAllUsers", checkUserRole, authenticator.getAllUsers);
  router.delete("/deleteUser/:userId", checkUserRole, authenticator.deleteUser);
  router.get("/getUser/:userId", authenticator.getUserById);

  return router;
};
