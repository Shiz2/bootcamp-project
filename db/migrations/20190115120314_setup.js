const { createTableIfNotExists } = require('../helpers')

exports.up = async knex => {
  const actions = [
    () =>
      createTableIfNotExists(knex, 'user', table => {
        table
          .uuid('id')
          .notNullable()
          .primary()

        table
          .string('name')
          .index()
          .notNullable()

        table
          .string('email')
          .index()
          .notNullable()
          .unique()

        table
          .string('password_hash')
          .index()
          .notNullable()

        table
          .string('birthday')
          .notNullable()
          .defaultTo('')

        table
          .string('concentration')
          .notNullable()
          .defaultTo('')

        table
          .string('hometown')
          .notNullable()
          .defaultTo('')

        table
          .string('house')
          .notNullable()
          .defaultTo('')

        table
          .text('bio')
          .notNullable()
          .defaultTo('')

        table.string('picture')

        table
          .string('gender')
          .notNullable()
          .defaultTo('')

        table
          .timestamp('created_at')
          .defaultTo(knex.fn.now())
          .notNullable()

        table
          .timestamp('updated_at')
          .defaultTo(knex.fn.now())
          .notNullable()
      }),
    () =>
      createTableIfNotExists(knex, 'post', table => {
        table
          .uuid('id')
          .notNullable()
          .primary()

        table.text('content')

        table
          .uuid('user_id')
          .index()
          .references('user.id')
          .notNullable()
          .unsigned()
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
      }),
    () =>
      createTableIfNotExists(knex, 'hobby', table => {
        table
          .uuid('id')
          .notNullable()
          .primary()

        table
          .enum('hobby', ['SPORTS', 'ARTS', 'MUSIC', 'READING', 'TRAVEL', 'DINING', 'CODING'])

        table
          .uuid('user_id')
          .index()
          .references('user.id')
          .notNullable()
          .unsigned()
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
      }),
  ]
  for (const action of actions) {
    await action()
  }
}

exports.down = async knex => {
  const actions = [
    () => knex.schema.dropTableIfExists('post'),
    () => knex.schema.dropTableIfExists('hobby'),
    () => knex.schema.dropTableIfExists('user'),
  ]
  for (const action of actions) {
    await action()
  }
}
