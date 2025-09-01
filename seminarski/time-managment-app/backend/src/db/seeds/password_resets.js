export async function seed(knex) {
  await knex("password_resets").del();

  await knex("password_resets").insert([
    { user_id: 2, token: "abc123token", expires_at: new Date(Date.now() + 3600 * 1000) }, // 1h od sada
    { user_id: 3, token: "reset456token", expires_at: new Date(Date.now() + 7200 * 1000) }, // 2h od sada
  ]);
}
