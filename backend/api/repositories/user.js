const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const User = require('../models/user');

//Internal error hangler
const handleError = (error) => {
    error.status = 500;
    reject(error);
}

const registerUser = (user) => {
    return new Promise((resolve, reject) => {
        User.find({ username: user.username })
            .exec()
            .then(
                result => {
                    if (result.length >= 1) {
                        const error = new Error();
                        error.status = 409;
                        error.message = "User exists."
                        reject(error);
                    }
                    bcrypt.hash(user.password, 10, (err, hash) => {

                        if (err) handleError(err);

                        const newUser = new User({
                            _id: mongoose.Types.ObjectId(),
                            username: user.username,
                            password: hash
                        });

                        newUser
                            .save()
                            .then(result => {
                                resolve(true);
                            })
                            .catch(handleError);

                    });
                }
            ).catch(handleError);
    });
}

const checkCredentials = (credentials) => {

    return new Promise((resolve, reject) => {
        User.find({username: credentials.username})
        .exec()
        .then(users => {
            if(user.length < 1)
                resolve(null);
            bcrypt.compare(credentials.password, users[0].password, (err, result) => {
                if(err || !result) resolve(null);
                resolve(user[0]);
            });
        })
        .catch(handleError);
    });

};

const getTopUsers = () => {
    return new Promise((resolve, reject) => {
        User.find()
        .sort('nAnswers')
        .limit(10)
        .select('username')
        .exec()
        .then(result => resolve(result))
        .catch(err => reject(error));
    });
}

const getById = (id) => {
    return new Promise((resolve, reject) => {
        User.findById(id)
        .select('username _id nAnswers')
        .exec()
        .then(user => resolve(user))
        .catch(err => reject(err));
    });
}

const updateUser = (id, body) => {
    const updateOps = {};
    for(const ops of body) updateOps[ops.propName] = ops.value;
    return new Promise((resolve, reject) => {
        User.findOneAndUpdate({_id:id}, {$set: updateOps })
        .exec()
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
};

const incrementComment = (id) => {
    return new Promise((resolve, reject) => {
        User.findOneAndUpdate({_id:id},{$inc:{nAnswers:1}})
        .exec()
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
};

module.exports = {
    registerUser,
    checkCredentials,
    getTopUsers,
    getById,
    updateUser,
    incrementComment
};