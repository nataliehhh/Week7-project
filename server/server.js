import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const PORT = 8080;
const app = express();
app.use(cors());

const dbConnectionString = process.env.DATABASE_URL;
const db = new pg.Pool({ connectionString: dbConnectionString });

app.get("/", (request, response)=>{
    response.json("This is my root route");
});

app.get("/posts", async (request, response)=>{
    const result = await db.query("SELECT * FROM posts");
    response.json(result.rows);
    console.log(result.rows);
});

app.listen(PORT, ()=> console.log(`App is running on PORT ${PORT}`));