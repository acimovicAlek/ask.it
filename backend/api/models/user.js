const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nAnswers:{
        type: Number,
        default: 0
    }

});

module.exports = mongoose.model('user', userSchema);