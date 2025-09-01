export async function seed(knex) {
  await knex("tasks").del(); // obriši sve postojeće

  await knex("tasks").insert([
    { title: "Prvi zadatak", description: "Opis prvog zadatka", status: "pending", user_id: 1 },
    { title: "Drugi zadatak", description: "Opis drugog zadatka", status: "in_progress", user_id: 2 },
    { title: "Treći zadatak", description: "Opis trećeg zadatka", status: "completed", user_id: 3 },
    { title: "Četvrti zadatak", description: "Dodatni test zadatak", status: "pending", user_id: 1 },
  ]);
}
