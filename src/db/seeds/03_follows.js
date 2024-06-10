
exports.seed = async function(knex) {

  await knex('follows').del();

  await knex('follows').insert([
    { follower_id: 1, followee_id: 2 },
    { follower_id: 2, followee_id: 1}
  ]);
};

