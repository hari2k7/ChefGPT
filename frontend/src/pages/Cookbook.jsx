import React from 'react'
import { useEffect, useState } from 'react';
import api from '../services/api';
import RecipeCard from '../components/RecipeCard';

function Cookbook() {

  const [recipes, setRecipes] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const handleDelete = async (recipeId) => {
    try {
      await api.delete(`/recipes/${recipeId}`);

      setRecipes(prev =>
        prev.filter(recipe => recipe._id !== recipeId)
      );
    } catch (err) {
      console.error(err);
      alert("Failed to delete recipe");
    }
  };

  const handleFavorite = async (recipeId) => {
    try {
      const response = await api.patch(
        `/recipes/${recipeId}/favorite`
      );

      setRecipes(prev =>
        prev.map(recipe =>
          recipe._id === recipeId
            ? response.data
            : recipe
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRecipes = async () => {
    try {
      const response = await api.get('/recipes')
      setRecipes(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  const displayedRecipes = showFavorites
    ? recipes.filter(recipe => recipe.isFavorite)
    : recipes;

  useEffect(() => {
    fetchRecipes()
  }, [])

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Cookbook
      </h1>

      <div className="mb-8 flex justify-center gap-4">
        <button
          onClick={() => setShowFavorites(false)}
          className={`px-5 py-2.5 rounded-full font-medium transition-all duration-200 ${!showFavorites
            ? "bg-amber-500 text-white shadow-md"
            : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
        >
          🍽️ All Recipes
        </button>

        <button
          onClick={() => setShowFavorites(true)}
          className={`px-5 py-2.5 rounded-full font-medium transition-all duration-200 ${showFavorites
            ? "bg-red-500 text-white shadow-md"
            : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
        >
          ❤️ Favorites
        </button>
      </div>


      {displayedRecipes.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-600">
            {showFavorites
              ? "No favorite recipes yet"
              : "No recipes found"}
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              onDelete={() => handleDelete(recipe._id)}
              onFavorite={() => handleFavorite(recipe._id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Cookbook