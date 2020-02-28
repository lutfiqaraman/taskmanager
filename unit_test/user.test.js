const request = require("supertest");
const express = require("express");

const app = express();
const mongoose = require("mongoose");

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

test('should signup a new user', async () => {
   await request(app).post("/users/user/create").send({
       name: 'Mr. Test User',
       email: 'test@user.com',
       password: 'Hello@000!'
    }).expect(201);
});
