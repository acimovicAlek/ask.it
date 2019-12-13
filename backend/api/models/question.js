const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    question: {
        type: String,
        required: true
    },
    rating:{
        type: Number, 
        default: 0
    } 

});

module.exports = mongoose.model('questinon', questionSchema);