import express from "express";

import dotenv from "dotenv"
dotenv.config();

import user_routes from "./routers/users_routers";
import notes_routes from "./routers/notes_routers";

// membuat variabel app 
const app = express();

// membuat objek port
const { PORT } = process.env;

// middleware 
app.use(express.urlencoded(
    {
        extended: false,
    }
))

// menambahkan middleware dalam bentuk json
app.use(express.json());

// memanggil routes
app.use(user_routes);
app.use(notes_routes);

// menampilkan listener pesan PORT bahwa servernya sudah berjalan
app.listen(PORT, () => {
    console.info(`Server Berjalan di Port ${PORT}`);
});