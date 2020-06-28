
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('steps').del()
    .then(function () {
      // Inserts seed entries
      return knex('steps').insert([
        {id: 1, step_number: 1, description: 'direction #1', recipe_id: 1},
        {id: 2, step_number: 2, description: 'direction #2', recipe_id: 1},
        {id: 3, step_number: 3, description: 'do something #3', recipe_id: 2},
      ]);
    });
};
