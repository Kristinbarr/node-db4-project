const db = require('../data/db-config')

module.exports = {
  getRecipes,
  getRecipesThatUseIngredient,
  getShoppingList,
  deleteRecipe,
  getInstructions,
}

// SELECT *
// FROM recipes

// getRecipes(): should return a list of all recipes in the database.
function getRecipes() {
  return db('recipes')
}

// SELECT r.name
// FROM recipes as r
// JOIN recipe_ingredients as ri
// ON r.id = ri.recipe_id
// WHERE ri.ingredient_id = 2;

// all recipes in the system that utilize a single ingredient
function getRecipesThatUseIngredient(ingredient_id) {
  return db('recipes as r')
    .join('recipe_ingredients as ri', 'r.id', 'ri.recipe_id')
    .select('r.name')
    .where('ri.ingredient_id', ingredient_id)
}

// SELECT i.name, ri.quantity, ri.unit
// FROM recipe_ingredients as ri
// JOIN ingredients as i
// ON ri.ingredient_id = i.id
// WHERE ri.recipe_id = 2;

// getShoppingList(recipe_id): should return a list of all ingredients and quantities for a given recipe
function getShoppingList(id) {
  return db('recipe_ingredients as ri')
    .join('ingredients as i', 'ri.ingredient_id', 'i.id')
    .select('i.name', 'ri.quantity', 'ri.unit')
    .where({ 'ri.recipe_id': id })
}

// DELETE 
// FROM recipes
// WHERE id = 1;

// delete a recipe by recipe id
function deleteRecipe(id) {
  return db('recipes')
  .where({ id: req.params.id })
  .del()
}

// SELECT s.step_number, s.description
// FROM recipes as r
// JOIN steps as s
// ON r.id = s.recipe_id
// WHERE r.id = 1;

// getInstructions(recipe_id): should return a list of step by step instructions for preparing a recipe
function getInstructions(id) {
  return db('recipes as r')
    .select('s.step_number', 's.description')
    .join('steps as s', { 'r.id': 's.recipe_id' })
    .where({ 'r.id': id })
}
