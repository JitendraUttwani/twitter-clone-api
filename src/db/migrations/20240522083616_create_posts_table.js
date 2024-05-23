exports.up = function(knex) {
    return knex.schema.createTable('posts', table => {
      table.increments('post_id').primary();
      table.integer('user_id').unsigned().notNullable().references('user_id').inTable('users').onDelete('CASCADE');
      table.text('message').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('posts');
  };
  