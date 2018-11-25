
exports.seed = function(knex, Promise) {
      return knex('users').insert([
        {id: 1, username: 'dmkite', password: 'password1'},
      ])
      .then(() => {
        return knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`)
      })

    }
