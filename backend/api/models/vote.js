const mongoose = require('mongoose');

const voteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    reference : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    type: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('vote', voteSchema);