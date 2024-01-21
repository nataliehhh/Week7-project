import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";
import { selectAllPostsQuery, selectPostById } from "./queries.js";

dotenv.config();
const PORT = 8080;
const app = express();
app.use(cors());
app.use(express.json());

const dbConnectionString = process.env.DATABASE_URL;
const db = new pg.Pool({ connectionString: dbConnectionString });

app.get("/", (request, response)=>{
    response.json("This is my root route");
});

app.get("/posts", async (request, response)=>{
    const result = await db.query(selectAllPostsQuery);
    response.json(result.rows);
    console.log(result.rows);
});

app.get("/posts/:id", async (request, response)=>{
    const selectedPostId = request.params.id;
    console.log("selected id", selectedPostId);
    const result = await db.query(selectPostById, [selectedPostId])
    response.json(result.rows);
    console.log("result", result.rows);
})

app.get("/form/origin_country", async (request, response)=>{
    const result = await db.query(`SELECT * FROM origin_country`);
    response.json(result.rows);
    console.log(result.rows);
});

app.get("/form/flavour_tags", async (request, response)=>{
    const result = await db.query(`SELECT * FROM flavour_tags`);
    response.json(result.rows);
    console.log(result.rows);
});

app.get("/form/brew_method", async (request, response)=>{
    const result = await db.query(`SELECT * FROM brew_method`);
    response.json(result.rows);
    console.log(result.rows);
});

app.post("/form/addPost", async function (request, response) {
    console.log("request body username", request.body.username);
    const username = request.body.username;
    const brew_name = request.body.brew_name;
    const roaster_name = request.body.roaster_name;
    const single_origin = request.body.single_origin;
    const review = request.body.review;
    const image = request.body.image;
    const newPost = await db.query(`INSERT INTO posts (username, brew_name, roaster_name, single_origin, review, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [username, brew_name, roaster_name, single_origin, review, image]);
    response.json(newPost.rows[0]);
});

app.listen(PORT, ()=> console.log(`App is running on PORT ${PORT}`));