const { default: mongoose } = require("mongoose");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['author', 'borrower'],
        required: true
    },
    language: {
        type: String,
        enum: ['en', 'hi'],
        default: 'en'
    }
})
const User = mongoose.model('user', userSchema)

module.exports = { User }