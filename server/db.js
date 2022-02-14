import pg from "pg";

export const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "node_postgres",
  password: "123",
  port: 5432,
});

// module.exports = pool;
// export default pool;
