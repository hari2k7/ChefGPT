import express from 'express'

import {generateRecipe,
    getAllRecipes,
    getRecipeById,
    deleteRecipe,
    toggleFavorite
} from '../controllers/recipeController.js'

const router = express.Router()

router.post('/generate', generateRecipe)
router.get('/',getAllRecipes)
router.get('/:id',getRecipeById)
router.delete('/:id',deleteRecipe)
router.get('/:id/favorite',toggleFavorite)

export default router