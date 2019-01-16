
exports.up = async knex => {
  return await knex.schema.createTableIfNotExists('follow', table => {
    table
      .uuid('id')
      .notNullable()
      .unsigned()

    table
      .uuid('follower_id')
      .index()
      .references('user.id')
      .notNullable()
      .onDelete('CASCADE')
      .onUpdate('CASCADE')

    table
      .uuid('following_id')
      .index()
      .references('user.id')
      .notNullable()
      .onDelete('CASCADE')
      .onUpdate('CASCADE')

    table
      .timestamp('created_at')
      .defaultTo(knex.fn.now())
      .notNullable()

    table
      .timestamp('updated_at')
      .defaultTo(knex.fn.now())
      .notNullable()
  })
};

exports.down = async knex => {
  return await knex.schema.dropTableIfExists('follow')
};
