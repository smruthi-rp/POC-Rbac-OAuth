/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - User
 *     description: Log in a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: grant_type
 *         in: formData
 *         description: Grant type for authentication (e.g., 'password')
 *         required: true
 *         type: string
 *       - name: client_id
 *         in: formData
 *         description: Client ID for authentication
 *         required: true
 *         type: string
 *       - name: client_secret
 *         in: formData
 *         description: Client secret for authentication
 *         required: true
 *         type: string
 *       - name: role
 *         in: formData
 *         description: User role (e.g., 'admin')
 *         required: true
 *         type: string
 *       - name: username
 *         in: formData
 *         description: User's username
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         description: User's password
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Register a new user
 *     description: Register a new user by providing their credentials.
 *     security:
 *        - bearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: grant_type
 *         in: formData
 *         description: Grant type for authentication (e.g., 'password')
 *         required: true
 *         type: string
 *       - name: client_id
 *         in: formData
 *         description: Client ID for authentication
 *         required: true
 *         type: string
 *       - name: client_secret
 *         in: formData
 *         description: Client secret for authentication
 *         required: true
 *         type: string
 *       - name: role
 *         in: formData
 *         description: User role (e.g., 'admin')
 *         required: true
 *         type: string
 *       - name: username
 *         in: formData
 *         description: User's username
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         description: User's password
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *       403:
 *         description: Access denied for this role
 */
/**
 
 * @swagger
 * /auth/getAllUsers:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get a list of all users
 *     description: Retrieve a list of all users in the system.
 *     security:
 *        - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *
 *       403:
 *         description: Access denied for this role.
 *       500:
 *         description: Internal server error.
 */
/**
 * @swagger
 * /auth/getUser/{userId}:
 *   get:
 *     tags:
 *       - User
 *     summary: Fetch a user by ID
 *     description: User can fetch his own profile.
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user to fetch
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User fetched successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/deleteUser/{userId}:
 *   delete:
 *     tags:
 *       - Admin
 *     summary: Delete a user by ID
 *     description: Delete a user by their unique ID. Requires Bearer Token authentication.
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user to delete
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied for this role
 *       500:
 *         description: Internal server error
 */
