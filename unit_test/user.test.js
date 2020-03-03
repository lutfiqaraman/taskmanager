const request = require("supertest");
const express = require("express");
const app = express();
const User = require("../models/user.model");
const mongoose = require("mongoose");
const {dummyUserID, dummyUser, setupDatabase} = require("./fixtures/db");

require("dotenv").config({ path: "./config/.env.test" });

app.use(express.json());

require("../routes/user.routes")(app);

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true  
    });
});

beforeEach(setupDatabase);

test("Should - sign up a new user ", async () => {
    const response = await request(app).post("/users/user/create").send({
        name: 'Mr. Test User',
        email: 'test@user.com',
        password: 'Hello@000!'
    }).expect(201);

    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    expect(response.body.user.name).toBe("Mr. Test User");

    expect(response.body).toMatchObject({
        user: {
            name: 'Mr. Test User',
            email: 'test@user.com'
        },
        token: user.tokens[0].token
    });

    expect(user.password).not.toBe("Hello@000!");
});

test("Should - an existing user should login", async () => {
    const response = await request(app).post("/users/login").send({
        email: dummyUser.email,
        password: dummyUser.password
    }).expect(200);

    const user = await User.findById(dummyUserID);
    expect(response.body.token).toBe(user.tokens[1].token);
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
    await request(app).delete("/users/user/delete")
        .set("Authorization", `Bearer ${dummyUser.tokens[0].token}`)
        .send()
        .expect(200);

    const user = await User.findById(dummyUserID);
    expect(user).toBeNull();
});

test("Should NOT - Delete account for an unauthenticated user", async () => {
    await request(app).delete("/users/user/delete")
        .send()
        .expect(401);
});