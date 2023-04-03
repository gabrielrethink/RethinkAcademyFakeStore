import { Knex } from "knex";

export const up = async (knex: Knex): Promise<void> =>
  await knex.schema.createTable("Categories", (table) => {
    table.increments("id");
    table.string("name");
  });

export const down = async (knex: Knex): Promise<void> =>
  await knex.schema.dropTable("Categories");
