export async function up(knex) {
  await knex.schema.createTable("tasks", (table) => {
    table.increments("id").primary(); // primarni ključ
    table.string("title").notNullable(); // naslov zadatka
    table.text("description"); // opis zadatka
    table.enu("status", ["pending", "in_progress", "completed"]).defaultTo("pending"); 
      // enumeracija statusa zadatka
    table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE"); 
      // veza sa korisnikom, obriši zadatak ako korisnik bude obrisan
    table.timestamps(true, true); // created_at i updated_at automatski
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("tasks");
}
