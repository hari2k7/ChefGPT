import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useNavigate, Navigate } from "react-router-dom";

export default function Register() {

    if (localStorage.getItem("token")) {
        return <Navigate to="/" replace />;
    }

    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/auth/register", form);
            alert("Registration successful");
            navigate("/login");
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">

            {/* Brand */}
            <div className="mb-10 text-center">
                <span className="text-2xl font-bold text-[#2c1a0e]" style={{ fontFamily: "'Georgia', serif" }}>
                    Chef<span className="text-[#c89b3c]">GPT</span>
                </span>
            </div>

            {/* Card */}
            <div className="w-full max-w-sm">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-[#2c1a0e]" style={{ fontFamily: "'Georgia', serif" }}>
                        Create an account
                    </h1>
                    <p className="mt-2 text-sm text-stone-400">
                        Start building your personal cookbook
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="block text-xs font-semibold tracking-widest uppercase text-stone-400">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            value={form.name}
                            onChange={handleChange}
                            autoComplete="name"
                            className="w-full border border-stone-200 rounded-2xl px-4 py-3 text-sm text-stone-800 placeholder-stone-300 outline-none focus:border-[#c89b3c] transition-colors bg-white shadow-sm"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-xs font-semibold tracking-widest uppercase text-stone-400">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            autoComplete="email"
                            className="w-full border border-stone-200 rounded-2xl px-4 py-3 text-sm text-stone-800 placeholder-stone-300 outline-none focus:border-[#c89b3c] transition-colors bg-white shadow-sm"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-xs font-semibold tracking-widest uppercase text-stone-400">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Min. 8 characters"
                            value={form.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                            className="w-full border border-stone-200 rounded-2xl px-4 py-3 text-sm text-stone-800 placeholder-stone-300 outline-none focus:border-[#c89b3c] transition-colors bg-white shadow-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#c89b3c] hover:bg-[#b8882e] text-white font-semibold py-3 rounded-2xl transition-colors mt-2 text-sm tracking-wide"
                    >
                        Create account
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-stone-400">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-[#2c1a0e] font-semibold hover:text-[#c89b3c] transition-colors"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}