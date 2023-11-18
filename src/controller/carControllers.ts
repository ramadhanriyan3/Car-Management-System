import express, { Express, Request, Response } from "express";
import { CarsModel } from "../models/cars";
import multer, { Multer } from "multer";
import CarServices from "../services/carServices";
import redis, { RedisClientType } from "redis";
const cloudinary = require("./../../cloudinary");
const uploadOnMemory = require("./../middleware/uploadOnMemory");

const app = express();

// redis init
const client = redis.createClient();

client.on("error", (err) => {
  console.error("Error in redis client", err);
});

// get Cars
const getCars = async (req: Request, res: Response) => {
  const getCars = await new CarServices().getAll();
  if (getCars.length) {
    console.log(getCars);
    return res.status(200).json(getCars);
  } else {
    return res.status(404).json({
      message: "Car list not found",
    });
  }
};

// Get car by id
const getCarById = async (req: Request, res: Response) => {
  // const getId = +req.params.id;
  const carById = await new CarServices().getById(req);
  if (carById.length) {
    console.log(carById);
    return res.status(200).json(carById);
  } else {
    return res.status(404).json({
      message: "Car list not found",
    });
  }
};

// dellete car
const deleteCar = async (req: Request, res: Response) => {
  const deleteData = await new CarServices().deleteCar(req);
  // const carList = await new CarServices().getAll();
  return res.json({
    status: "OK",
    message: deleteData,
  });
};

// postCar
const postCar = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }

    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;
    const result = await cloudinary.uploader.upload(file);

    const {
      car_name,
      brand_id,
      type_id,
      capacity,
      car_year,
      price,
      availability,
    } = body;

    const image_url = result.url;

    const postCar = await new CarServices().postCar({ ...body, image_url });

    // await CarsModel.query()
    //   .insert({
    //     ...body,
    //     image_url,
    //   })
    //   .returning("*");

    res.status(201).json({ message: "New car has been created", car: postCar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update Car
const updateCar = async (req: Request, res: Response) => {
  const body = req.body;
  const reqId = +req.params.id;
  const carById = await CarsModel.query().where("car_id", "=", reqId);

  if (!carById.length) {
    res.status(404).json({ message: "Car not found" });
  }

  if (req.file) {
    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;
    const result = await cloudinary.uploader.upload(file);
    const image_url = result.url;
    const updateData = { ...body, image_url };
    console.log(body);
    const updateCar = await new CarServices().updateCar(req, updateData);
    res.status(301).json({ message: "update success", updateData });
  } else {
    const updateData = body;
    const updateCar = await CarsModel.query()
      .where("car_id", "=", reqId)
      .update(updateData);
    res.status(301).json({ message: "update success", updateData });
  }

  // const updateCar = await CarsModel.query()
  //   .where("car_id", "=", car_id)
  //   .update({});
};

module.exports = { getCars, getCarById, deleteCar, postCar, updateCar };
