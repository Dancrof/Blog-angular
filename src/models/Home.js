const { Schema, model } = require('mongoose');

const homeSchema = new Schema({

    posts: Object

}, {
    timestamps: true
});
module.exports = model('Home', homeSchema);