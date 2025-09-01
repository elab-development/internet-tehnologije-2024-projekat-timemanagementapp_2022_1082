export async function seed(knex) {
  await knex("files").del();

  await knex("files").insert([
    { filename: "dokument1.pdf", filepath: "/uploads/dokument1.pdf", task_id: 1 },
    { filename: "slika1.png", filepath: "/uploads/slika1.png", task_id: 2 },
    { filename: "prezentacija1.pptx", filepath: "/uploads/prezentacija1.pptx", task_id: 3 },
  ]);
}
