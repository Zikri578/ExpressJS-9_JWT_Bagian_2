import express from "express";
import { PrismaClient } from "@prisma/client";

// membuat variabel db
const db = new PrismaClient();

// untuk bisa dipakai di semua file
export default db