import { Knex } from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable("users", (table: Knex.TableBuilder) => {
        table.string("user_id").primary();
        table.string("name", 255).notNullable();
        table.string("email", 255).unique().nullable();
        table.string('password',255).nullable();
        table.string('role',255).nullable()
        table.timestamp('created_at').defaultTo(knex.fn.now());
      });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable("users");
}

