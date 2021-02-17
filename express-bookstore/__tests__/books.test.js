/** Integration tests for books route */

process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
const db = require("../db");

// isbn of sample book
let book_isbn;

beforeEach(async () => {
  let result = await db.query(`
    INSERT INTO 
      books (isbn, amazon_url,author,language,pages,publisher,title,year)   
      VALUES(
        '1603429867', 
        'https://www.amazon.com/Kiss-My-Aster-Creating-Fantastic/dp/1603429867', 
        'Amanda Thomsen', 
        'English', 
        240,  
        'Storey Publishing, LLC', 
        'Kiss My Aster: A Graphic Guide to Creating a Fantastic Yard Totally Tailored to You', 2012) 
      RETURNING isbn`);

  book_isbn = result.rows[0].isbn;
});

describe("POST /books", async function () {
  test("Creates a new book", async function () {
    const response = await request(app).post(`/books`).send({
      isbn: "0399580352",
      amazon_url:
        "https://www.amazon.com/Vietnamese-Food-Any-Day-Recipes/dp/0399580352",
      author: "Andrea Nguyen",
      language: "english",
      pages: 240,
      publisher: "Ten Speed Press",
      title: "Vietnamese Food Any Day: Simple Recipes for True, Fresh Flavors",
      year: 2012,
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.book).toHaveProperty("isbn");
  });

  test("Prevents creating book without required title", async function () {
    const response = await request(app).post(`/books`).send({ year: 2000 });
    expect(response.statusCode).toBe(400);
  });
});

describe("GET /books", async function () {
  test("Gets a list of 1 book", async function () {
    const response = await request(app).get(`/books`);
    const books = response.body.books;
    expect(books).toHaveLength(1);
    expect(books[0]).toHaveProperty("isbn");
    expect(books[0]).toHaveProperty("amazon_url");
  });
});

describe("GET /books/:isbn", async function () {
  test("Gets a single book", async function () {
    const response = await request(app).get(`/books/${book_isbn}`);
    expect(response.body.book).toHaveProperty("isbn");
    expect(response.body.book.isbn).toBe(book_isbn);
  });

  test("Responds with 404 if can't find book in question", async function () {
    const response = await request(app).get(`/books/999`);
    expect(response.statusCode).toBe(404);
  });
});

describe("PUT /books/:id", async function () {
  test("Updates a single book", async function () {
    const response = await request(app).put(`/books/${book_isbn}`).send({
      amazon_url:
        "https://bookshop.org/books/kiss-my-aster-a-graphic-guide-to-creating-a-fantastic-yard-totally-tailored-to-you/9781603429863://www.amazon.com/Kiss-My-Aster-Creating-Fantastic/dp/1603429867",
      author: "Amanda Thomsen",
      language: "English",
      pages: 240,
      publisher: "Storey Publishing, LLC",
      title:
        "Kiss My Aster: A Graphic Guide to Creating a Fantastic Yard Totally Tailored to You",
      year: 2012,
    });
    expect(response.body.book).toHaveProperty("isbn");
    expect(response.body.book.amazon_url).toBe(
      "https://bookshop.org/books/kiss-my-aster-a-graphic-guide-to-creating-a-fantastic-yard-totally-tailored-to-you/9781603429863://www.amazon.com/Kiss-My-Aster-Creating-Fantastic/dp/1603429867"
    );
  });

  test("Prevents a bad book update", async function () {
    const response = await request(app).put(`/books/${book_isbn}`).send({
      isbn: "8675309",
      amazon_url: "https://taco.com",
      author: "mctest",
      language: "english",
      pages: 1000,
      publisher: "yeah right",
      title: "DO NOT ADD ME",
      year: 2000,
    });
    expect(response.statusCode).toBe(400);
  });

  test("Responds 404 if can't find book in question", async function () {
    // delete book first
    await request(app).delete(`/books/${book_isbn}`);
    const response = await request(app).delete(`/books/${book_isbn}`);
    expect(response.statusCode).toBe(404);
  });
});

describe("DELETE /books/:id", function () {
  test("Deletes a single a book", async function () {
    const response = await request(app).delete(`/books/${book_isbn}`);
    expect(response.body).toEqual({ message: "Book deleted" });
  });
});

afterEach(async function () {
  await db.query("DELETE FROM BOOKS");
});

afterAll(async function () {
  await db.end();
});
