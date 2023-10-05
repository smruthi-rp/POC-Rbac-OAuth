let pgPool;

module.exports = (injectedPgPool) => {
  pgPool = injectedPgPool;

  return {
    register,
    getUser,
    isValidUser,
    getAllUsers,
    deleteUser,
    getUserById,
  };
};

function register(username, password, role, cbFunc) {
  const registerQuery = `INSERT INTO users (username, user_password, role) VALUES ('${username}', '${password}', '${role}')`;
  pgPool.query(registerQuery, (response) => {
    cbFunc(
      false,
      response.results && response.results.rowCount === 1
        ? response.results.rows[0]
        : null
    );
  });
}

function getUser(username, password, cbFunc) {
  const getUserQuery = `SELECT * FROM users WHERE username = '${username}' AND user_password = '${password}'`;
  pgPool.query(getUserQuery, (response) => {
    cbFunc(
      false,
      response.results && response.results.rowCount === 1
        ? response.results.rows[0]
        : null
    );
  });
}

function isValidUser(username, cbFunc) {
  const query = `SELECT * FROM users WHERE username = '${username}'`;

  const checkUserCallback = (response) => {
    const isValidUser = response.results
      ? !(response.results.rowCount > 0)
      : null;

    cbFunc(response.error, isValidUser);
  };

  pgPool.query(query, checkUserCallback);
}

function getAllUsers(cbFunc) {
  const query = `SELECT * FROM users`;

  pgPool.query(query, (response) => {
    if (response.error) {
      cbFunc(response.error, null);
    } else {
      cbFunc(null, response.results ? response.results.rows : []);
    }
  });
}
function deleteUser(userId, cbFunc) {
  const deleteQuery = `DELETE FROM users WHERE id = ${userId}`;
  pgPool.query(deleteQuery, (response) => {
    if (response.error) {
      cbFunc(response.error, null);
    } else {
      cbFunc(null, true);
    }
  });
}
function getUserById(userId, cbFunc) {
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  pgPool.query(query, (response) => {
    if (response.error) {
      cbFunc(response.error, null);
    } else {
      cbFunc(null, response.results ? response.results.rows[0] : null);
    }
  });
}
