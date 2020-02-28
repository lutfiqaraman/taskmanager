const request = require("supertest");
const app = require("../src/app");

test('should signup a new user', async () => {
   await request(app).post("/users/user/create").send({
       name: 'Mr. Test User',
       email: 'test@email.com',
       password: 'MyPass777!'
    }).expect(201);
});
