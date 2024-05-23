
exports.seed = async function(knex) {

  await knex('follows').del();

  await knex('follows').insert([
    { follower_id: 15, followee_id: 16 },
    { follower_id: 16, followee_id: 15}
  ]);
};

