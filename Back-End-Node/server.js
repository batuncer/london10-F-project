const express = require("express");
const app = express();
const { pool } = require("./dbConfig");

app.use(express.json());
require("dotenv").config();

//GET method below just to test if the server is running, when you create an endpoint you can delete this
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM public.city");
    //I received the output '{"user":"postgres"}' without 'public' preceding 'user' because PostgreSQL defaults to a behavior where referencing a 'user' table without specifying a schema results in the default system view or object named 'user' being referenced inadvertently. To explicitly refer to the 'user' table, I utilized the table's schema name or qualified the table name with the schema where it exists.
    res.send(result.rows);
  } catch (error) {
    res.status(500).send("Error inserting data");
    console.error("Error executing query:", error);
  }
});
