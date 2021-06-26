const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    title: String,
    description: String,
    postTime: Date
}, {
    timestamps: true
});

module.exports = model('Post', postSchema);