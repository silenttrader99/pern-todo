"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = __importDefault(require("pg"));
const Pool = pg_1.default.Pool;
exports.pool = new Pool({
    user: "postgres",
    password: "mus25299",
    database: "perntodo",
    host: "localhost",
    port: 5432,
});
