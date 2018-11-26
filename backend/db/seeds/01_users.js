
exports.seed = function(knex, Promise) {
      return knex('users').insert([
        {id: 1, username: 'dmkite', password: 'password1'},
        {id: 2, username: 'username', password: '$2b$10$4RMCebqFZToYq/q5VgLexu43N9g.acthXAAMxExSpl07wxScq27US'}
      ])
      .then(() => {
        return knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`)
      })

    }
