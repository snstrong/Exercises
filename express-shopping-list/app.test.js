process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("./app");
let items = require("./fakeDb");

let pickles = { name: "pickles", price: 2.99 };

beforeEach(function () {
  items.length = 0;
  items.push(pickles);
});

describe("GET /items", () => {
  test("Get all items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([pickles]);
  });
});

describe("GET /items/:name", () => {
  test("Get item by name", async () => {
    const res = await request(app).get(`/items/${pickles.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ item: pickles });
  });
  test("Responds with 404 for invalid item", async () => {
    const res = await request(app).get(`/items/icecubes`);
    expect(res.statusCode).toBe(404);
  });
});

describe("POST /items", () => {
  test("Creating a item", async () => {
    const res = await request(app)
      .post("/items")
      .send({ name: "nachos", price: 5.99 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ item: { name: "nachos", price: 5.99 } });
  });
  test("Responds with 400 if name is missing", async () => {
    const res = await request(app).post("/items").send({});
    expect(res.statusCode).toBe(400);
  });
});

describe("/PATCH /items/:name", () => {
  test("Updating a item's name", async () => {
    const res = await request(app)
      .patch(`/items/${pickles.name}`)
      .send({ name: "olives" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ item: { name: "olives", price: 2.99 } });
  });
  test("Responds with 404 for invalid name", async () => {
    const res = await request(app)
      .patch(`/items/cookies`)
      .send({ name: "cookies" });
    expect(res.statusCode).toBe(404);
  });
});

describe("/DELETE /items/:name", () => {
  test("Deleting a item", async () => {
    const res = await request(app).delete(`/items/${pickles.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Deleted" });
  });
  test("Responds with 404 for deleting invalid item", async () => {
    const res = await request(app).delete(`/items/ham`);
    expect(res.statusCode).toBe(404);
  });
});
