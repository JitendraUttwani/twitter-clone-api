const bcrypt = require('bcryptjs');

exports.seed = async function(knex) {
  await knex('users').del();
  await knex('users').insert([
    {
      username: 'richie_rich',
      name: 'Richie Rich',
      email: 'richie@example.com',
      password: await bcrypt.hash('password', 10),
      bio: 'This is richie\'s bio',
      location: 'New York, USA',
      created_at: new Date(),
    },
    {
      username: 'shreyansh_thakur',
      name: 'Shreyansh thakur',
      email: 'shreyansh@example.com',
      password: await bcrypt.hash('password', 10),
      bio: 'This is shreyansh\'s bio',
      location: 'Uttar pradesh, India',
      created_at: new Date(),
    }
  ]);
};
