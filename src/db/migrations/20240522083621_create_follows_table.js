
exports.up = function(knex) {
    return knex.schema.createTable('follows', table => {
      table.integer('follower_id').unsigned().references('user_id').inTable('users').onDelete('CASCADE');
      table.integer('followee_id').unsigned().references('user_id').inTable('users').onDelete('CASCADE');
      table.primary(['follower_id', 'followee_id']);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('follows');
  };
  
