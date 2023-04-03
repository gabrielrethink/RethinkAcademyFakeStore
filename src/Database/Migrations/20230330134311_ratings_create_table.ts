import { Knex } from "knex";

export const up = async (knex: Knex): Promise<void> =>
  await knex.schema.createTable("Ratings", (table) => {
    table.increments("id");
    table.tinyint("rate");
    table.integer("product_id");
    table.foreign("product_id").references("Products.id");
  });

export const down = async (knex: Knex): Promise<void> =>
  await knex.schema.dropTable("Ratings");
