import express, { Express, Request, Response } from "express";
import knex from "knex";
import { Model } from "objection";
import redis, { RedisClientOptions } from "redis";
const cloudinary = require("./../cloudinary");
const handler = require("./../src/controller/carControllers");
const uploadOnMemory = require("./../src/middleware/uploadOnMemory");

const PORT = 3000;

// database conector
const app: Express = express();
const knexInstance = knex({
  client: "postgresql",
  connection: {
    database: "chapter_5",
    user: "postgres",
    password: "kalianda23",
  },
});
Model.knex(knexInstance);
// middleware
app.use(express.urlencoded());
app.use(express.json());

// get Cars
app.get("/cars", handler.getCars);
// get car by id
app.get("/cars/:id", handler.getCarById);
// dellete data
app.delete("/cars/:id/delete", handler.deleteCar);
// post car
app.post("/cars/create", uploadOnMemory.single("picture"), handler.postCar);
// update car
app.patch(
  "/cars/:id/update",
  uploadOnMemory.single("picture"),
  handler.updateCar
);

app.listen(PORT, () => console.log(`lintening to port ${PORT}`));
