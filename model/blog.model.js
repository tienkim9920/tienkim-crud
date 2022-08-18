var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
    }
);

var Blog = mongoose.model('Blog', schema, 'blog');

module.exports = Blog;