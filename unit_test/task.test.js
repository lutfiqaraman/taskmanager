const request = require("supertest");
const express = require("express");
const Task = require("../models/task.model");
const mongoose = require("mongoose");
const { dummyUserID, dummyUser, setupDatabase } = require("./fixtures/db");

require("dotenv").config({ path: "./config/.env.test" });

const app = express();

app.use(express.json());

require("../routes/task.routes")(app);

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true  
    });
});

beforeEach(setupDatabase);

test('should create a task for a user ', async () => {
    const response = 
        await request(app)
            .post("/tasks/task/create")
            .set("Authorization", `Bearer ${dummyUser.tokens[0].token}`)
            .send({
                description: "Jest Test"
            })
            .expect(201);
    
    const task = await Task.findById(response.body._id);
    
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false);
});