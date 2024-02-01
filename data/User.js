const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    roles: { 
        Read: { type: Number, default: 2222},
        Admin: { type: Number},
        Edit: { type: Number}
    },
    refreshToken: String
})

module.exports = mongoose.model('User', userSchema);