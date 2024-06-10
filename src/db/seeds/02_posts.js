exports.seed = async function(knex) {
  await knex('posts').del();

  await knex('posts').insert([
    {
      user_id: 1,
      message: 'Hello, this is my first tweet!',
      created_at: new Date()
    },
    {
      user_id: 2,
      message: 'Hello, this is Jane\'s first tweet!',
      created_at: new Date()
    }
  ]);
};