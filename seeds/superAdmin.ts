import { Knex } from "knex";
import { v4 as uuidv4 } from "uuid";
const { encryptPassword } = require("./../src/helper/encryptPassword");

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      user_id: uuidv4(),
      name: "marcell",
      email: "marcell.superadmin@gmail.com",
      password: await encryptPassword("123456"),
      role: "super_admin",
    },
  ]);
}
