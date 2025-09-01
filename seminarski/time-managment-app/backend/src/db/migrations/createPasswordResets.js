export async function up(knex) {
  await knex.schema.createTable("password_resets", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");
    table.string("token").notNullable(); // token za reset lozinke
    table.timestamp("expires_at").notNullable(); // kada token ističe
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("password_resets");
}
