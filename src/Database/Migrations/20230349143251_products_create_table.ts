import { Knex } from "knex";

export const up = async (knex: Knex): Promise<void> =>
  await knex.schema.createTable("Products", (table) => {
    table.increments("id");
    table.string("title").notNullable();
    table.decimal("price").notNullable();
    table.string("description");
    table.integer("category_id");
    table.foreign("category_id").references("Categories.id");
  });

export const down = async (knex: Knex): Promise<void> =>
  await knex.schema.dropTable("Products");
