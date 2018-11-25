
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('characters').del()
    .then(function () { 
      return knex('users').del()
    });
};
