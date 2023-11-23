import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("log_history", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("user_id").notNullable();
    table.string("car_id").notNullable();
    table.string("action").notNullable();
    table.text("description");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("log_history");
}
