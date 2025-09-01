export async function up(knex) {
  await knex.schema.createTable("files", (table) => {
    table.increments("id").primary();
    table.string("filename").notNullable(); // ime fajla
    table.string("filepath").notNullable(); // putanja do fajla na serveru
    table.integer("task_id").unsigned().references("id").inTable("tasks").onDelete("CASCADE"); 
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("files");
}
