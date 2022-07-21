import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js";

// Init express app 
const app = express();



// Setting up data size limit for urlencoded and json files to use
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

// Setting up the Routes
app.use("/posts", postRoutes); // urls with "/posts" are forwarded to postRoutes

// Connecting the DataBase
const CONNECION_URL = 'mongodb+srv://ahtrvz:cluster0@cluster0.jvqph.mongodb.net/memories_database?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(
    CONNECION_URL, 
    { useNewUrlParser: true, useUnifiedTopology: true },
).then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((err) => console.log(err.message));
