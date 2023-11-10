const multer = require("multer");
const path = require("path");
import express, { Express, Request, Response } from "express";

const publicDir: string = path.join(__dirname, "./../../public");
const uploadDir: string = path.join(publicDir, "uploads");

const storage = multer.diskStorage({
  destination: (req: Request, file: any, cb: any) => {
    cb(null, uploadDir);
  },

  filename: (req: Request, file: any, cb: any) => {
    const uniqSuffix = Date.now() + `-` + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqSuffix + path.extname(file.originalname)
    );
  },
});

module.exports = multer({ storage });
