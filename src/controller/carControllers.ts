import express, { Request, Response } from "express";
import { CarsModel } from "../models/cars";
import CarServices from "../services/car";
import { v4 as uuidv4 } from "uuid";
import LogServices from "../services/logHistory";
const cloudinary = require("./../../cloudinary");
const uploadOnMemory = require("./../middleware/uploadOnMemory");

const app = express();

// redis init
// const client = redis.createClient();

// client.on("error", (err:any) => {
//   console.error("Error in redis client", err);
// });

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
  const getId = req.params.id;
  const logData = {
    user_id: (req as any).user?.user_id,
    car_id: getId,
    action: "delete",
    description: `deleting car item with id ${getId}`,
  };
  const newLog = await new LogServices().postLog(logData);
  const deleteData = await new CarServices().deleteCar(req);
  return res.status(202).json({
    status: "Item has been deleted",
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
    const result = await cloudinary.uploader.upload(file, { timeout: 120000 });

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
    const car_id = uuidv4();
    const postCar = await new CarServices().postCar({
      ...body,
      car_id,
      image_url,
    });
    const logData = {
      user_id: (req as any).user?.user_id,
      car_id,
      action: "post",
      description: `add new car item with id ${car_id}`,
    };
    const newLog = await new LogServices().postLog(logData);
    console.log(logData);
    res.status(201).json({ message: "New car has been created", car: postCar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update Car
const updateCar = async (req: Request, res: Response) => {
  const body = req.body;
  const reqId = req.params.id;
  console.log(reqId);
  const carById = await CarsModel.query().where("car_id", "=", reqId);

  if (!carById.length) {
    res.status(404).json({ message: "Car not found" });
  }

  if (req.file) {
    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;
    const result = await cloudinary.uploader.upload(file, { timeout: 120000 });
    const image_url = result.url;
    const updateData = { ...body, image_url };
    console.log(body);
    const updateCar = await new CarServices().updateCar(req, updateData);
    const logData = {
      user_id: (req as any).user?.user_id,
      car_id: reqId,
      action: "patch",
      description: `update car item with id ${reqId}`,
    };
    const newLog = await new LogServices().postLog(logData);
    console.log(logData, newLog);
    res.status(301).json({ message: "update success", updateData });
  } else {
    const updateData = body;
    const updateCar = await CarsModel.query()
      .where("car_id", "=", reqId)
      .update(updateData);
    const logData = {
      user_id: (req as any).user?.user_id,
      car_id: reqId,
      action: "patch",
      description: `update car item with id ${reqId}`,
    };
    const newLog = await new LogServices().postLog(logData);
    res.status(301).json({ message: "update success", updateData });
  }
};

module.exports = { getCars, getCarById, deleteCar, postCar, updateCar };
