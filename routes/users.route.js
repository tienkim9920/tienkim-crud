const express = require("express");
const router = express.Router();
const users = require("../data/user.data");
const jwt = require('jsonwebtoken')

/**
 * @swagger
 * components:
 *   schemas:
 *     users:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The login username
 *         password:
 *           type: string
 *           description: The login password
 *       example:
 *         username: tienkim9920
 *         password: '123'
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The login API
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login users
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/users'
 *     responses:
 *      200:
 *        description: Login Successfully
 *      404:
 *         description: Login Unsuccessful
 */
router.post('/login', async (req, res) => {

    const { username } = req.body;
    const { password } = req.body;

    const user = users.find((element) => {
        return element.username === username && element.password === password
    });

    try {
        if (!user) {
            res.status(404).json({ msg: "Login Unsuccessful" })
        } else {
            var token = jwt.sign({ user: user }, 'hackertuoicc');
            res.status(200).json(token)
        }
    } catch {
        res.status(404).json({ msg: "Login Unsuccessful" })
    }

})


module.exports = router