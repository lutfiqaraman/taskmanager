const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../models/user.model");

const dummyUserID = mongoose.Types.ObjectId();

const dummyUser = {
    _id: dummyUserID,
    name: 'Test User',
    email: 'test@unittest.com',
    password: '123@onetwo',
    tokens: [{
        token: jwt.sign({ _id: dummyUserID}, process.env.JWT_PRIVATEKEY)
    }]
}

const setupDatabase = async () => {
    await User.deleteMany();
    await new User(dummyUser).save();
}

module.exports = {
    dummyUserID,
    dummyUser,
    setupDatabase
}