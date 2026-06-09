import React from 'react'
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function RecipeCard({ recipe, onDelete }) {
    console.log("onDelete prop:", onDelete);
    console.log("RecipeCard loaded");
    if (!recipe) return null;

    const navigate = useNavigate();

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
        <div
            className="bg-[#f8f5f0] rounded-[30px] border border-[#e7ddd2] hover:border-[#e8920a] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            onClick={() => navigate(`/recipe/${recipe._id}`)}
        >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#2b1a10] to-[#5b371f] px-6 py-6 text-white relative ">
                <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#f5a623] mb-2">
                    {recipe.cuisine}
                </div>

                <h2 className="font-serif text-[20px] font-bold text-white leading-[1.3]">
                    {recipe.title}
                </h2>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
                <div className="flex flex-wrap gap-4 mb-4">
                    <span className="flex items-center gap-1 text-[13px] text-[#7a6a5a]">
                        ⏱️ {recipe.prepTime}
                    </span>

                    <span className="flex items-center gap-1 text-[13px] text-[#7a6a5a]">
                        🔥 {recipe.cookTime}
                    </span>

                    <span className="flex items-center gap-1 text-[13px] text-[#7a6a5a]">
                        👥 {recipe.servings}
                    </span>
                </div>

                <span
                    className={`inline-flex px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide mb-4
                ${recipe.difficulty?.toLowerCase() === "easy"
                            ? "bg-green-100 text-green-700"
                            : recipe.difficulty?.toLowerCase() === "medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                        }`}
                >
                    {recipe.difficulty}
                </span>

                {recipe.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                        {recipe.tags.slice(0, 4).map((tag, i) => (
                            <span
                                key={i}
                                className="text-[12px] bg-[#faf6ef] border border-[#e8ddd0] text-[#7a6a5a] px-2.5 py-1 rounded-full"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-[#e8ddd0] bg-[#faf6ef]">
                <button className="text-[16px] font-semibold text-[#e8920a] hover:text-[#d4820a] transition">
                    View Recipe →
                </button>

                <div className="flex items-center gap-3">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm("Delete this recipe?")) {
                                onDelete();
                            }
                        }}
                        className="text-[#c0a090] hover:text-[#c0392b] hover:bg-[#fde8e8] p-1 rounded-md transition"
                        title="Delete"
                    >
                        Delete
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleWhatsAppShare();
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md"
                    >
                        <FaWhatsapp size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RecipeCard