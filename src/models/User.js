const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: String,
    email: String,
    fechaNacimiento: String,
    ubicacion: String,
    estadoCivil: String,
    trabajo: String,
    telefono: String,
    password: String

}, {
    timestamps: true
});

module.exports = model('User', userSchema);