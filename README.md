# POC-Rbac-OAuth
Project employee to implement RBAC and OAuth 2.0

## Overview
This project demonstrates the implementation of Role-Based Access Control (RBAC) and OAuth 2.0 for secure user authentication and authorization. RBAC is used to manage access rights for different user roles, such as admin and user/employee, while OAuth 2.0 ensures secure user authentication and token-based authorization.

## Project Structure
- `auth` folder contains authentication-related code.
  - `authMiddleware.js`: Middleware for checking user roles.
  - `authenticator.js`: Authentication logic for user registration and login.
  - `routes.js`: Express routes configuration.
- `db` folder contains database-related code.
  - `pgWrapper.js`: PostgreSQL database wrapper.
  - `tokenDB.js`: Database operations for access tokens.
  - `userDB.js`: Database operations for user management.
- `test` folder includes test APIs and routes.
- `index.js`: Main server file.

## Usage
1. Install dependencies:
   ```bash
   npm install

## Configure PostgreSQL:

- Create a PostgreSQL database named `logrocket_oauth2`.
- Update database credentials in `db/pgWrapper.js`.
- Start the server:
`node index.js`

## API Endpoints:

- Registration: `POST /auth/register`
- Login: `POST /auth/login`
- Secure API: `POST /test/hello`

## RBAC Implementation
- Middleware `authMiddleware.js` checks user roles.
- Routes are configured to allow access based on user roles.
- Admin and user/employee roles are defined.

## OAuth 2.0 Implementation
- OAuth 2.0 is used for secure user authentication.
- Tokens are generated for authorized access.
- Bearer tokens are utilized for API access.

