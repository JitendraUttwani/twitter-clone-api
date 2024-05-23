exports.seed = async function(knex) {
  await knex('posts').del();

  await knex('posts').insert([
    {
      user_id: 15,
      message: 'Hello, this is my first tweet!',
      created_at: new Date()
    },
    {
      user_id: 16,
      message: 'Hello, this is Jane\'s first tweet!',
      created_at: new Date()
    }
  ]);
};