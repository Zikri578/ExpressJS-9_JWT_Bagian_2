import express from "express";
import { users_create_register, user_login } from "../controllers/users_controllers";

// membuat variabel user_routes
const user_routes = express.Router();

// membuat route create user register menggunakan method post
user_routes.post("/user/register", users_create_register);

// membuat route create user login
user_routes.post("/user/login", user_login);

// memanggil secara default
export default user_routes