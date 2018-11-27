
exports.up = function(knex, Promise) {
    return knex.schema.createTable('characters', table => {
        table.increments()
        table.integer('user_id').notNullable()
        table.foreign('user_id').references('users.id')
        table.text('character').notNullable()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('characters')
};
