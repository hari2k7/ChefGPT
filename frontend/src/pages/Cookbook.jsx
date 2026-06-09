import React from 'react'
import { useEffect, useState } from 'react';
import api from '../services/api';
import RecipeCard from '../components/RecipeCard';

function Cookbook() {

  const [recipes, setRecipes] = useState([]);

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

  const fetchRecipes = async () => {
    try {
      const response = await api.get('/recipes')
      setRecipes(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchRecipes()
  }, [])

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Cookbook
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            onDelete={() => handleDelete(recipe._id)}
          />
        ))}
      </div>
    </div>
  )
}

export default Cookbook