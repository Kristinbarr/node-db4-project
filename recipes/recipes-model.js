const db = require('../data/db-config')

module.exports = {
  getRecipes,
  getShoppingList,
  getInstructions,
}

// SELECT *
// FROM recipes

// getRecipes(): should return a list of all recipes in the database.
function getRecipes() {
  return db('recipes')
}

// SELECT name, quantity
// FROM recipe_ingredients as ri
// JOIN ingredients as i
// ON ri.ingredient_id = i.id
// WHERE ri.recipe_id = 2;

// getShoppingList(recipe_id): should return a list of all ingredients and quantities for a given recipe
function getShoppingList(id) {
  return db('recipe_ingredients as r')
    .join('ingredients as i', 'r.ingredient_id', 'i.id')
    .select('i.name', 'r.quanity', 'r.unit')
    .where({ 'r.recipe_id': id })
}

// SELECT s.step_number, s.description
// FROM recipes as r
// JOIN steps as s
// ON r.id = s.recipe_id;

// getInstructions(recipe_id): should return a list of step by step instructions for preparing a recipe
function getInstructions(id) {
  return db('recipes as r')
    .select('s.step_number', 's.description')
    .join('steps as s', { 'r.id': 's.recipe_id' })
    .where({ 'r.id': id })
}
