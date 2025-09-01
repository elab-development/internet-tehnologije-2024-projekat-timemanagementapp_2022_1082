export async function up(knex) {
  await knex.schema.createTable("comments", (table) => {
    table.increments("id").primary();
    table.text("content").notNullable(); // sadržaj komentara
    table.integer("task_id").unsigned().references("id").inTable("tasks").onDelete("CASCADE"); 
      // komentar pripada zadatku
    table.integer("user_id").unsigned().references("id").inTable("users").onDelete("SET NULL"); 
      // ko je napisao komentar
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("comments");
}
