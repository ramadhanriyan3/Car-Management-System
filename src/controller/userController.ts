import express, { Express, Request, Response } from "express";
import UserServices from "../services/user";
import { v4 as uuidv4 } from "uuid";
const { createToken } = require("./../helper/createJwt");
const { encryptPassword } = require("./../helper/encryptPassword");
const { checkPassword } = require("./../helper/checkPassword");

// memberRegister
async function memberRegister(req: Request, res: Response) {
  const body = req.body;
  const userData = {
    user_id: uuidv4(),
    name: body.name,
    email: body.email.toLowerCase(),
    password: await encryptPassword(body.password),
    role: "member",
  };
  const registerdUser = await new UserServices().register(userData);

  res.status(201).json({
    message: "new user has beed added",
  });
}

// adminRegister
async function adminRegister(req: Request, res: Response) {
  const body = req.body;
  const userData = {
    user_id: uuidv4(),
    name: body.name,
    email: body.email.toLowerCase(),
    password: await encryptPassword(body.password),
    role: "admin",
  };
  const registerdUser = await new UserServices().register(userData);

  res.status(201).json({
    message: "new user has beed added",
  });
}

async function login(req: Request, res: Response) {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  const user = await new UserServices().getUser({ email });
  console.log({ email });

  if (!user) {
    res.status(404).json({ message: "Email not found" });
    return;
  }
  const isPasswordCorrect = await checkPassword(user.password, password);
  if (!isPasswordCorrect) {
    res.status(401).json({ message: "Wrong password" });
    return;
  }
  const { user_id, name, role, created_at } = user;
  const token = createToken({ user_id, name, email, role, created_at });

  res.status(201).json({ message: "succes", token });
}

async function currentUser(req: Request, res: Response) {
  const currentUser = req.user;
  res.status(200).json({
    message: "succses",
    currentUser,
  });
}

module.exports = { adminRegister, login, memberRegister, currentUser };
