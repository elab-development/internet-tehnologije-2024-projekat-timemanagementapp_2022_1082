export async function up(knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("username").notNullable().unique();
    table.string("password").notNullable();
    table.enu("role", ["admin", "user", "guest"]).defaultTo("user");
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("users");
}
