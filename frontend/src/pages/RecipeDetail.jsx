import React from 'react'
import { FaWhatsapp } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function RecipeDetail() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchRecipe = async () => {
    try {
      const response = await api.get(`/recipes/${id}`);
      setRecipe(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!recipe) {
    return <h1>Recipe not found</h1>;
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/recipes/${id}`);

      navigate("/cookbook");
    } catch (err) {
      console.error(err);
      alert("Failed to delete recipe");
    }
  };


  const instructionsText = recipe.instructions
    .map((step, index) => `${index + 1}. ${step.text}`)
    .join("\n");

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(`
*${recipe.title}*

*Ingredients:*
${recipe.ingredients.join("\n")}

*Instructions:*
${instructionsText}

*Generated with ChefGPT*
        `);

    window.open(
      `https://wa.me/?text=${message}`,
      "_blank"
    );
  };

  return (
    <div className="mt-8 w-full max-w-4xl mx-auto rounded-3xl border border-[#e6d8c8] bg-white p-8 shadow-lg">
      <h1 className="text-3xl font-bold text-[#2a1b17]">
        {recipe.title}
      </h1>

      <div className="mt-4 flex gap-6 text-[#6f6258]">
        <span>Preparation Time: {recipe.prepTime}</span>
        <span>Cook Time: {recipe.cookTime}</span>
        <span>Serving: {recipe.servings}</span>
      </div>

      <h2 className="mt-6 text-xl font-semibold">
        Ingredients
      </h2>
      <ul className="list-disc pl-5">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient}
          </li>
        ))}
      </ul>

      <h2 className="mt-6 text-xl font-semibold">
        Instructions
      </h2>
      <ol className="list-decimal pl-5">
        {recipe.instructions.map((instruction) => (
          <li key={instruction.step}>
            {instruction.text}
          </li>
        ))}
      </ol>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={handleWhatsAppShare}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
        >
          <FaWhatsapp size={20} />
          Share on WhatsApp
        </button>

        <button
          onClick={async () => {
            if (window.confirm("Delete this recipe?")) {
              await handleDelete();
            }
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Delete
        </button>
      </div>

    </div>
  )
}

export default RecipeDetail