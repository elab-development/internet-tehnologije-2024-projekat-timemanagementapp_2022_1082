export async function seed(knex) {
  
  await knex("users").del();

  // ubaci test podatke
  await knex("users").insert([
    { username: "admin", password: "admin123", role: "admin" },
    { username: "john", password: "test123", role: "user" },
    { username: "guest", password: "guest123", role: "guest" }
  ]);
}
