exports.seed = async function(knex) {
  
  await knex('likes').del();

  await knex('likes').insert([
    { user_id: 1, post_id: 1 }, 
    { user_id: 2, post_id: 1 }, 
  ]);
};