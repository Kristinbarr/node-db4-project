const express = require('express')
const db = require('../data/db-config.js')
const recipes = require('./recipes-model')
const router = express.Router()

// GET /api/recipes - returns all recipes (without details about ingredients or steps)
router.get('/recipes', (req, res) => {
  recipes.getRecipes()
    .then(recipes => {
      res.status(200).json(recipes)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

// GET /api/recipes/:id/shoppingList - returns a list of ingredients and quantites for a single recipe
router.get('/recipes/:id/shoppingList', (req, res) => {
  const { id } = req.params
  recipes
  .getShoppingList(id)
  .then(list => {
      console.log('steps:', list)
      res.status(200).json(list)
    })
    .catch(error => {
      res.status(500).json({ error: 'server error :(' })
    })
})

// GET /api/recipes/:id/instructions - returns a correctly ordered list of how to prepare a single recipe
router.get('/recipes/:id/instructions', (req, res) => {
  const { id } = req.params
  recipes
    .getInstructions(id)
    .then(steps => {
      if (steps.length) {
        res.status(200).json(steps)
      } else {
        res.status(404).json({ message: 'Could not find steps for given recipe' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get steps for given recipe' })
    })
})

// DELETE /api/recipes/:id - remove recipe
router.delete('/recipes/:id', (req, res) => {
  const { id } = req.params
  recipes.deleteRecipe(id)
    .then(count => {
      if (count > 0) {
        res.status(204).end()
      } else {
        res.status(404).json({ message: 'Record not found' })
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

// ***** INGREDIENTS *****

// GET /api/ingredients/:id/recipes - all recipes in the system that utilize a single ingredient
router.get('/ingredients/:id/recipes', (req, res) => {
  const { id } = req.params
  recipes.getRecipesThatUseIngredient(id)
  .then(recipes => {
    console.log('recipes:', recipes)
      if (recipes.length < 0) {
        res.status(404).json({ message: 'No recipes found' })
      } else {
        res.status(200).json(recipes)
      }
    })
    .catch(error => {
      console.log('error:', error)
      res.status(500).json({ message: 'Could not complete the request for recipes'})
    })
})

// POST /api/ingredients - add an ingredient
router.post('/ingredients', (req, res) => {
  db('ingredients')
    .insert(req.body)
    .then(ids => {
      const id = ids[0]
      db('ingredients')
        .where({ id })
        .first()
        .then(ingredient => {
          res.status(201).json(ingredient)
        })
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

module.exports = router
