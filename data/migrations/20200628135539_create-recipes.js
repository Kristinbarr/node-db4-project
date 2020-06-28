
exports.up = function(knex) {
  return knex.schema
    .createTable('recipes', table => {
      table.increments()
      table.string('name').notNull()
      table.text('directions').notNull()
    })
    .createTable('ingredients', table => {
      table.increments()
      table.string('name').notNull()
    })
    .createTable('recipe_ingredients', table => {
      table.increments()
      table.unique(['recipe_id', 'ingredient_id'])
      table.integer('recipe_id')
        .unsigned() // no negative integers
        .notNull()
        .references('id')
        .inTable('recipes')
        .onUpdate('CASCADE') // checks if id exists elsewhere
        .onDelete("RESTRICT") // cannot delete because there are other dependant tables
      table.integer('ingredient_id')
        .unsigned()
        .notNull()
        .references('id')
        .inTable('ingredients')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
      table.float('quantity')
      table.string('unit')
    })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('recipe_ingredients')
  .dropTableIfExists('ingredients')
  .dropTableIfExists('recipes')
};
