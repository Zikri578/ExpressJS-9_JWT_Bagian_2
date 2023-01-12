import { request, response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

// membuat variabel user_middleware
const user_middleware = async (req = request, res = response, next) => {
    try {

        // membuat variabel authorization untuk melakukan pengecekkan apakah ada authorization
        const authorization = await req.headers.authorization;

        if (!authorization) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Authorization tidak ditemukan..",
                }
            )
        };

        /**
         * Penggunaan split token : 
         * Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJoYWhoYUBnbWFpbC5jb20iLCJpYXQiOjE2NzM1MDAwMjR9._FV0HBs5NXkxHsfcC9ADXxASfYsBlGEHANfZwWLgiOY
         * ["Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJoYWhoYUBnbWFpbC5jb20iLCJpYXQiOjE2NzM1MDAwMjR9._FV0HBs5NXkxHsfcC9ADXxASfYsBlGEHANfZwWLgiOY"]
         **/
        // membuat variabel token
        const token = await authorization.split(" ")[1];

        // melakukan validasi token
        const verify = await jwt.verify(token, process.env.SECRET_KEY);

        /** mengecek verify
         * {
         *  "id" : 1,
         *  "email" : "hahha@gmail.com",
         * }
        **/
        if (!verify) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Token tidak terverifikasi",
                }
            )
        };

        // melakukan generate request body
        req.body.user_id = verify.id;
        req.body.email = verify.email;

        // melanjutkan verifikasi
        next();

    } catch (error) {
        // mengembalikan respons kedalam bentuk json
        return res.status(500).json(
            {
                // menampilkan pesan error
                success: false,
                error: error.message,
            }
        )
    }
}

// untuk bisa dipakai di file ini
export default user_middleware;