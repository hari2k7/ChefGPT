import React, { useState } from "react";
import api from "../services/api";
import RecipeCard from "../components/RecipeCard";

function Home() {

    const [prompt, setPrompt] = useState("");
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        try {
            setLoading(true);
            setError("");

            const response = await api.post("/recipes/generate", {
                prompt,
            });

            setRecipe(response.data);
        } catch (err) {
            setError("Failed to generate recipe");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (recipeId) => {
        try {
            await api.delete(`/recipes/${recipeId}`);
            setRecipe(null);
        } catch (err) {
            console.error(err);
        }
    };

    const handleFavorite = async (recipeId) => {
        try {
            const response = await api.patch(
                `/recipes/${recipeId}/favorite`
            );

            setRecipe(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    return (
        <div className="flex flex-col items-center px-6 pt-24">
            <p className="inline-flex items-center gap-2 mb-6 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-amber-600">
                👋 Welcome back, {user?.name}
            </p>

            <h1 className="text-center text-4xl sm:text-5xl md:text-7xl font-black leading-tight tracking-tight text-[#2a1b17]">
                Your personal{" "}
                <span className="italic text-[#d89410]">
                    AI Chef
                </span>
                <br />
                at your service
            </h1>

            <p className="mt-6 max-w-3xl text-center text-base sm:text-lg md:text-xl leading-relaxed text-[#6f6258] px-4">
                Describe what you're craving, what's in your fridge, or any dish —
                ChefGPT crafts the perfect recipe instantly.
            </p>

            <div className="mt-10 w-full max-w-190">
                <div className="flex flex-col sm:flex-row gap-3 rounded-[28px] border border-[#e6d8c8] bg-white p-2 shadow-md">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="What do you want to cook now?"
                        rows={1}
                        className="w-full resize-none bg-transparent px-4 py-4 text-base sm:text-lg text-[#6f6258] placeholder:text-[#b7a392] outline-none"
                    />

                    <button
                        className="w-full sm:w-auto flex h-14 items-center justify-center gap-2 rounded-[20px] bg-[#e7b75c] px-8 font-semibold text-white transition-all duration-200 hover:bg-[#dda947] hover:shadow-lg"
                        onClick={handleGenerate}
                    >
                        Generate
                    </button>
                </div>

                {loading && (
                    <p className="mt-6 text-lg">
                        Generating recipe...
                    </p>
                )}

                {error && (
                    <p className="mt-4 text-red-500">
                        {error}
                    </p>
                )}

                {recipe && (
                    <div className="mt-8 w-full rounded-2xl border border-[#e6d8c8] bg-white p-6 shadow-md">
                        <RecipeCard
                            recipe={recipe}
                            onDelete={() => handleDelete(recipe._id)}
                            onFavorite={() => handleFavorite(recipe._id)}
                        />
                    </div>
                )}

            </div>
        </div>
    );
}

export default Home;