import { Knex } from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("cars", (table: Knex.TableBuilder) => {
    table.string("car_id").primary();
    table.string("car_name", 255).notNullable();
    table.integer("brand_id").notNullable();
    table.integer("type_id").notNullable();
    table.integer("capacity").notNullable();
    table.integer("car_year");
    table.string("image_url", 255);
    table.integer("price").notNullable();
    table.boolean("availability").notNullable().defaultTo(true);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("cars");
}
