const request = require("supertest");
const express = require("express");

const app = express();
const mongoose = require("mongoose");
const User = require("../models/user.model");

require("dotenv").config({ path: "./config/.env.test" });

app.use(express.json());
require("../routes/user.routes")(app);

const dummyUser = {
    name: 'Test User',
    email: 'test@unittest.com',
    password: '123@onetwo'
}

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true  
    });
});

beforeEach( async () => {
    await User.deleteMany();
    await new User(dummyUser).save();
});

test("Should - sign up a new user ", async () => {
    await request(app).post("/users/user/create").send({
        name: 'Mr. Test User',
        email: 'test@user.com',
        password: 'Hello@000!'
    }).expect(201);
});

test("Should - an existing user should login", async () => {
    await request(app).post("/users/login").send({
        email: dummyUser.email,
        password: dummyUser.password
    }).expect(200);
});

test("Should NOT - Nonexisting user should not login", async () => {
    await request(app).post("/users/login").send({
        email: dummyUser.email,
        password: "fake_password"
    }).expect(400);
});