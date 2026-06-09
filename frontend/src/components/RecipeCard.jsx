import React from 'react'

function RecipeCard({ recipe }) {
    if (!recipe) return null;
    return (
        <div className="mt-8 w-full rounded-3xl border border-[#e6d8c8] bg-white p-8 shadow-lg">
            <h1 className="text-3xl font-bold text-[#2a1b17]">
                {recipe.title}
            </h1>

            <div className="mt-4 flex gap-6 text-[#6f6258]">
                <span>Prep Time: {recipe.prepTime}</span>
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
        </div>
    )
}

export default RecipeCard