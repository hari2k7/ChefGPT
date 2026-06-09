import React, { useState } from "react";
import api from "../services/api";

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

    return (
        <div className="flex flex-col items-center px-6 pt-24">
            <h1 className="text-center text-6xl md:text-7xl font-black leading-[1.05] tracking-tight text-[#2a1b17]">
                Your personal{" "}
                <span className="italic text-[#d89410]">
                    AI Chef
                </span>
                <br />
                at your service
            </h1>

            <p className="mt-6 max-w-3xl text-center text-xl leading-relaxed text-[#6f6258]">
                Describe what you're craving, what's in your fridge, or any dish —
                ChefGPT crafts the perfect recipe instantly.
            </p>

            <div className="mt-10 w-full max-w-[760px]">
                <div className="flex items-center rounded-[28px] border border-[#e6d8c8] bg-white p-2 shadow-md">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder='What do you want to cook now?'
                        className="h-16 flex-1 bg-transparent px-6 text-lg text-[#6f6258] placeholder:text-[#b7a392] outline-none"
                    />

                    <button
                        className="flex h-14 items-center gap-2 rounded-[20px] bg-[#e7b75c] px-8 font-semibold text-white transition-all duration-200 hover:bg-[#dda947] hover:shadow-lg"
                        onClick={handleGenerate}
                    >
                        🔍 Generate
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
                        <pre className="overflow-auto whitespace-pre-wrap">
                            {JSON.stringify(recipe, null, 2)}
                        </pre>
                    </div>
                )}

            </div>
        </div>
    );
}

export default Home;