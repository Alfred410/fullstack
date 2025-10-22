const express = require("express"),
  path = require("path");
const dotenv = require("dotenv"),
  { Client } = require("pg");
const { request } = require("http");

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

const app = express();

app.use(express.json());

const createTable = async () => {
  await client.query(`
    CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};
createTable();

app.get("/todos", async (_request, response) => {
  const result = await client.query("SELECT * FROM todos");
  response.json(result.rows);
});

app.post("/todos", async (request, response) => {
  const { title } = request.body;
  const result = await client.query(
    "INSERT INTO todos (title) VALUES ($1) RETURNING *",
    [title]
  );
  response.json(result.rows[0]);
});

app.put("/todos/:id", async (request, response) => {
  const { id } = request.params;
  const { completed } = request.body;
  await client.query("UPDATE todos SET completed = $1 WHERE id = $2", [
    completed,
    id,
  ]);
  response.json({ message: "Todo updated" });
});

app.delete("/todos/:id", async (request, response) => {
  const { id } = request.params;
  await client.query("DELETE FROM todos WHERE id = $1", [id]);
  response.json({ message: "Todo deleted" });
});

app.use(express.static(path.join(path.resolve(), "dist")));

app.listen(3000, () => {
  console.log("Redo på http://localhost:3000/");
});
