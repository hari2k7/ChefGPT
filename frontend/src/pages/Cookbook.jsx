import React from 'react'
import { useEffect, useState } from 'react';
import api from '../services/api';
import RecipeCard from '../components/RecipeCard';

function Cookbook() {

  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response =await api.get('/recipes')
      setRecipes(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchRecipes()
  }, [])

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Cookbook
      </h1>

      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe._id}
          recipe={recipe}
        />
      ))}
    </div>
  )
}

export default Cookbook