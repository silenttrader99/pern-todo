import express from "express";
import cors from "cors";
import { pool } from "./routes/db";

export const serve = () => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/todos`);
  });

  // Routes
  // Create a todo
  app.post("/todos", async (req, res) => {
    try {
      const { content, title, deadline } = req.body;
      const newTodo = await pool.query(
        "INSERT INTO todo (title, content, deadline) VALUES($1, $2, $3) RETURNING *",
        [title, content, deadline]
      );
      res.json(newTodo);
    } catch (error) {
      console.error((error as Error).message);
    }
  });

  // Get all todos
  app.get("/todos", async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT * FROM todo");
      res.json(allTodos);
    } catch (error) {
      console.error((error as Error).message);
    }
  });

  // Get a todo
  app.get("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await pool.query("SELECT * FROM todo WHERE id = $1", [id]);
      res.json(todo);
    } catch (error) {
      console.error((error as Error).message);
    }
  });

  // Update a todo
  app.put("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { content, title, deadline } = req.body;
      const updatedTodo = await pool.query(
        "UPDATE todo SET title = $1, content = $2, deadline = $3 WHERE id = $4",
        [title, content, deadline, id]
      );
      res.json(updatedTodo);
    } catch (error) {
      console.error((error as Error).message);
    }
  });

  // Delete a todo
  app.delete("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedTodo = await pool.query("DELETE FROM todo WHERE id = $1", [
        id,
      ]);
      res.json(deletedTodo);
    } catch (error) {
      console.error((error as Error).message);
    }
  });
};

serve();
