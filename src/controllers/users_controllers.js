import { request, response } from "express";
import db from "../../prisma/connection";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

// membuat users register
export const users_create_register = async (req = request, res = response) => {
    try {
        // membuat variabel data yang isinya permintaan body
        const data = await req.body;

        // membuat createUser/result yang isinya mengambil database user yang akan dibuat
        const result = await db.users.create(
            {
                // mengambil variabel data yang ada didalam schema database
                data: data,
            }
        );

        // membuat objek secret key
        const { SECRET_KEY } = process.env;

        // melakukan generate jsonwebtoken
        const token = jwt.sign(
            {
                id: result.id,
                email: result.email,
            },
            // secret key
            SECRET_KEY
        );

        // mengembalikan permintaan status kedalam bentuk json
        return res.status(201).json(
            {
                // menampilkan pesan bahwa pesan berhasil dibuat
                success: true,
                message: "Data User Berhasil Ditambahkan",
                token: token,
            }
        )
    } catch (error) {
        // mengembalikan respons kedalam bentuk json
        return res.status(500).json(
            {
                // menampilkan pesan error
                success: false,
                message: error.message,
            }
        )
    }
}

// membuat login user 
export const user_login = async (req = request, res = response) => {
    try {
        // membuat variabel data yang isinya permintaan body 
        const data = await req.body;

        // melakukan check email
        const checkEmail = await db.users.findUnique(
            {
                where: {
                    email: data.email,
                }
            }
        );

        // melakukan pengkondisian email apakah ada atau tidak
        if (!checkEmail) {
            return (
                res.status(404).json(
                    {
                        success: false,
                        message: "Email tidak ditemukan atau tidak terdaftar",
                    }
                )
            )
        }

        // melakukan pengkondisian password apakah ada atau tidak
        if (data.password !== checkEmail.password) {
            return (
                res.status(401).json(
                    {
                        success: false,
                        message: "Password tidak sesuai!",
                    }
                )
            )
        }

        // membuat variabek token untuk melakukan generate token
        const token = await jwt.sign(
            {
                id: checkEmail.id,
                email: checkEmail.email
            },
            process.env.SECRET_KEY
        );

        return (
            res.status(200).json(
                {
                    success: true,
                    message: "Hore.. Login Berhasil :D",
                    token: token
                }
            )
        )
    } catch (error) {
        // mengembalikan response error kedalam bentuk json 
        return res.status(500).json(
            {
                success: false,
                error: error.message,
            }
        )
    }
}