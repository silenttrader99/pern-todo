"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./routes/db");
const serve = () => {
    const app = (0, express_1.default)();
    // Middleware
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}/todos`);
    });
    // Routes
    // Create a todo
    app.post("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { content, title, deadline } = req.body;
            const newTodo = yield db_1.pool.query("INSERT INTO todo (title, content, deadline) VALUES($1, $2, $3) RETURNING *", [title, content, deadline]);
            res.json(newTodo);
        }
        catch (error) {
            console.error(error.message);
        }
    }));
    // Get all todos
    app.get("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allTodos = yield db_1.pool.query("SELECT * FROM todo");
            res.json(allTodos);
        }
        catch (error) {
            console.error(error.message);
        }
    }));
    // Get a todo
    app.get("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const todo = yield db_1.pool.query("SELECT * FROM todo WHERE id = $1", [id]);
            res.json(todo);
        }
        catch (error) {
            console.error(error.message);
        }
    }));
    // Update a todo
    app.put("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { content, title, deadline } = req.body;
            const updatedTodo = yield db_1.pool.query("UPDATE todo SET title = $1, content = $2, deadline = $3 WHERE id = $4", [title, content, deadline, id]);
            res.json(updatedTodo);
        }
        catch (error) {
            console.error(error.message);
        }
    }));
    // Delete a todo
    app.delete("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const deletedTodo = yield db_1.pool.query("DELETE FROM todo WHERE id = $1", [
                id,
            ]);
            res.json(deletedTodo);
        }
        catch (error) {
            console.error(error.message);
        }
    }));
};
exports.serve = serve;
(0, exports.serve)();
