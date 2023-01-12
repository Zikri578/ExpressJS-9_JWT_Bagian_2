import express from "express";
import { notes_create, notes_read } from "../controllers/notes_controllers";
import user_middleware from "../middleware/user_middleware";

// membuat variabel note_routes
const notes_routes = express.Router();

// membuat route create notes menggunakan method post
notes_routes.post("/notes/create", user_middleware, notes_create);

// membuat route read notes menggunakan method post
notes_routes.get("/notes/read", user_middleware, notes_read);

// memanggil secara default
export default notes_routes;