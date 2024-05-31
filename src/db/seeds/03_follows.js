
exports.seed = async function(knex) {

  await knex('follows').del();

  await knex('follows').insert([
    { follower_id: 3, followee_id: 4 },
    { follower_id: 4, followee_id: 3}
  ]);
};

