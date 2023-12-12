const request = require('supertest');
import app from "../index";
import {server} from "../index";
import { default as mongoose } from 'mongoose';
import {describe, expect, test} from '@jest/globals';
const jwt = require('jsonwebtoken');
require("dotenv").config();

beforeAll(done => {
    jest.setTimeout(10000);
    done();
  })

afterAll(done => {
    mongoose.connection.close();
    server.close();
    done();
})


// describe("Test API GET /api/wallet", () => {
//     // Put the token in the headers
//     let token = jwt.sign({"email": "test@test,com"}, process.env.JWT_SECRET || 'secret', { expriresIn: 232000 });
//     let headers = {
//         'x-access-token': token,
//         'Content-Type': 'application/json',
//         'Authorization':  token
//     }

//     test("Chiamata all'API in maniera corretta", async () => {
//         const response = await request(app).get("/api/wallet").set(headers);
//         console.log(response.body);
//         expect(response.statusCode).toBe(200);
//         expect(response.body).not.toBeNull();
//         expect(response.body).not.toBeUndefined();
//         expect(response.body).toHaveProperty("success", true);
//         expect(response.body).toHaveProperty("wallets");
//     });
// });