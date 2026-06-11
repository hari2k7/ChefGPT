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
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate("/cookbook")}
        className="mb-6 flex items-center gap-2 text-[#e8920a] font-semibold hover:-translate-x-1 transition"
      >
        ← Back to Cookbook
      </button>

      {/* Recipe Header */}
      <div className="rounded-3xl bg-white border border-[#e6d8c8] shadow-lg p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-[#2a1b17]">
              {recipe.title}
            </h1>

            <p className="mt-2 text-[#6f6258]">
              Delicious homemade recipe perfect for family meals.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <div className="rounded-xl bg-amber-50 px-5 py-3">
                <p className="text-sm text-gray-500">Prep Time</p>
                <p className="font-semibold">{recipe.prepTime}</p>
              </div>

              <div className="rounded-xl bg-amber-50 px-5 py-3">
                <p className="text-sm text-gray-500">Cook Time</p>
                <p className="font-semibold">{recipe.cookTime}</p>
              </div>

              <div className="rounded-xl bg-amber-50 px-5 py-3">
                <p className="text-sm text-gray-500">Servings</p>
                <p className="font-semibold">{recipe.servings}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleWhatsAppShare}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition"
            >
              <FaWhatsapp size={18} />
              Share
            </button>

            <button
              onClick={async () => {
                if (window.confirm("Delete this recipe?")) {
                  await handleDelete();
                }
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {/* Ingredients */}
        <div className="bg-white rounded-3xl border border-[#e6d8c8] shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-5">
            Ingredients
          </h2>

          <ul className="space-y-3">
            {recipe.ingredients.map((ingredient, index) => (
              <li
                key={index}
                className="bg-[#faf6f0] rounded-xl p-3"
              >
                • {ingredient}
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="md:col-span-2 bg-white rounded-3xl border border-[#e6d8c8] shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-5">
            Instructions
          </h2>

          <ol className="space-y-5">
            {recipe.instructions.map((instruction) => (
              <li
                key={instruction.step}
                className="flex gap-4"
              >
                <div className="h-8 w-8 shrink-0 rounded-full bg-[#e8920a] text-white flex items-center justify-center font-bold">
                  {instruction.step}
                </div>

                <p className="pt-1 text-[#2a1b17]">
                  {instruction.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail