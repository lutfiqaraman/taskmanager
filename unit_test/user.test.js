const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const app = express();
const User = require("../models/user.model");

require("dotenv").config({ path: "./config/.env.test" });

app.use(express.json());
require("../routes/user.routes")(app);

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

test("Should - Get profile user", async () => {
    await request(app).get("/users/user/showprofile")
        .set("Authorization", `Bearer ${dummyUser.tokens[0].token}`)
        .send()
        .expect(200);
});

test("Should NOT - Get a user profile for unauthenticated user", async () => {
    await request(app).get("/users/user/showprofile")
        .send()
        .expect(401);
});

test("Should - Delete account for a user", async () => {
    await request(app).delete("/users/user/avatar")
        .set("Authorization", `Bearer ${dummyUser.tokens[0].token}`)
        .send()
        .expect(200);
});

test("Should NOT - Delete account for an unauthenticated user", async () => {
    await request(app).delete("/users/user/avatar")
        .send()
        .expect(401);
});