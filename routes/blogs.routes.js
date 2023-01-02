const express = require("express");
const router = express.Router();
const Blog = require("../model/blog.model");

/**
 * @swagger
 * components:
 *   schemas:
 *     blogs:
 *       type: object
 *       required:
 *         - title
 *         - username
 *         - body
 *         - phone
 *       properties:
 *         title:
 *           type: string
 *           description: The blog title
 *         username:
 *           type: string
 *           description: The blog username
 *         phone:
 *           type: string
 *           description: The blog phone
 *       example:
 *         _id: 62123b3640565ece426e15a9
 *         title: Chạy Bộ
 *         username: Nguyen Kim Tien
 *         body: Lorem...
 *         phone: TextString
 */

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: The blogs managing API
 */

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Returns the list of all the blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: The list of the blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/blogs'
 */
router.get('/', async (req, res) => {
    const blogs = await Blog.find();
    res.status(200).json(blogs)
})

/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/blogs'
 *     responses:
 *       200:
 *         description: Create Successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/blogs'
 *       404:
 *         description: Some server error
 */
router.post('/', async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.status(200).json(blog);
    } catch (error) {
        res.status(404).json(error);
    }
})

/**
 * @swagger
 * /blogs:
 *  patch:
 *    summary: Update the blog
 *    tags: [Blogs]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              title: Chạy Bộ
 *              username: Nguyen Kim Tien
 *              body: Lorem...
 *              phone: TextString
 *    responses:
 *      200:
 *        description: Updated Successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/blogs'
 *      404:
 *         description: Some server error
 */
router.patch('/', async (req, res) => {
    try {
        const { _id, title, username, body, phone } = req.body;
        if (_id) {
            let blog = await Blog.findById({ _id });
            if (title) {
                blog.title = title;
            }
            if (username) {
                blog.username = username;
            }
            if (body) {
                blog.body = body;
            }
            if (phone) {
                blog.phone = phone;
            }
            blog.save();
            res.status(200).json("Update Successfully");
        }
    } catch (error) {
        res.status(404).json(error);
    }
})

/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     summary: Remove the blog by id
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 *     responses:
 *       200:
 *         description: Deleted Successfully
 *       404:
 *         description: Some server error
 */
router.delete('/:id', async (req, res) => {
    try {
        await Blog.deleteOne({ _id: req.params.id });
        res.status(200).json("Delete Successfully");
    } catch (error) {
        res.status(404).json(error);
    }
})


/**
 * @swagger
 * /blogs/pagination:
 *   get:
 *     summary: get the blog by query limit & page
 *     tags: [Blogs]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: The list of the blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/blogs'
 */
router.get('/pagination', async (req, res) => {
    try {
        const { limit, page } = req.query;
        let blogs = await Blog.find().skip((page - 1) * limit).limit(limit);
        res.status(200).json(blogs);
    } catch (error) {
        res.json(error);
    }
})


/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     summary: get the blog by id
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 *     responses:
 *       200:
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/blogs'
 */
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById({ _id: req.params.id });
        res.json(blog);
    } catch (error) {
        res.json(error);
    }
})

router.post('/image', async (req, res) => {
    var fileImage = req.files.file;
    var fileName = fileImage.name
    try {
        // create path to client get image
        var fileProduct = "https://tienkim-crud.herokuapp.com/" + fileName
        // move file name in folder public
        fileImage.mv('./public/' + fileName)
        res.send(200).json(fileProduct)
    } catch (error) {
        res.send(404).json(error)
    }
})

module.exports = router