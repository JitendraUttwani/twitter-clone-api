exports.up = function(knex) {
    return knex.schema.createTable('likes', function(table) {
      table.integer('user_id').unsigned().notNullable().references('user_id').inTable('users').onDelete('CASCADE');
      table.integer('post_id').unsigned().notNullable().references('post_id').inTable('posts').onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.primary(['user_id', 'post_id']);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('likes');
  };