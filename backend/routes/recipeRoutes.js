import express from 'express'

import {
    generateRecipe,
    getAllRecipes,
    getRecipeById,
    deleteRecipe,
    toggleFavorite
} from '../controllers/recipeController.js'

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/generate', authMiddleware, generateRecipe)
router.get('/', authMiddleware, getAllRecipes)
router.get('/:id', authMiddleware, getRecipeById)
router.delete('/:id', authMiddleware, deleteRecipe)
router.patch('/:id/favorite', authMiddleware, toggleFavorite)

export default router