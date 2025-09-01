export async function seed(knex) {
  await knex("comments").del();

  await knex("comments").insert([
    { content: "Prvi komentar", task_id: 1, user_id: 2 },
    { content: "Drugi komentar", task_id: 1, user_id: 3 },
    { content: "Treći komentar", task_id: 2, user_id: 1 },
    { content: "Komentar na treći zadatak", task_id: 3, user_id: 2 },
  ]);
}
