const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'question',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    rating:{
        type: Number, 
        default: 0
    } 

});

module.exports = mongoose.model('answer', answerSchema);