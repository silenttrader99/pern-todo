import pg from "pg";

const Pool = pg.Pool;

export const pool = new Pool({
  user: "postgres",
  password: "mus25299",
  database: "perntodo",
  host: "localhost",
  port: 5432,
});
