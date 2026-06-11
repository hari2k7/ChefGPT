import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useNavigate, Navigate } from "react-router-dom";
import ChefHat from "../assets/ChefHat.png";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {

    if (localStorage.getItem("token")) {
        return <Navigate to="/" replace />;
    }

    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/login", form);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/");
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">

            <div className=''>
                <img src={ChefHat} alt="Chef" className="h-15 w-15" />
                <span className="text-2xl font-bold font-Poppins text-[#D4AF37] ml-2">
                    GPT
                </span>
            </div>

            <div className="w-full max-w-sm">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-[#2c1a0e]" style={{ fontFamily: "'Georgia', serif" }}>
                        Welcome back
                    </h1>
                    <p className="mt-2 text-sm text-stone-400">
                        Sign in to your cookbook
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                            placeholder="••••••••"
                            value={form.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                            className="w-full border border-stone-200 rounded-2xl px-4 py-3 text-sm text-stone-800 placeholder-stone-300 outline-none focus:border-[#c89b3c] transition-colors bg-white shadow-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#c89b3c] hover:bg-[#b8882e] text-white font-semibold py-3 rounded-2xl transition-colors mt-2 text-sm tracking-wide"
                    >
                        Sign in
                    </button>

                    <div className="mt-4">
                        <GoogleLogin
                            onSuccess={async (credentialResponse) => {
                                try {
                                    const response = await api.post(
                                        "/auth/google",
                                        {
                                            credential: credentialResponse.credential,
                                        }
                                    );

                                    localStorage.setItem(
                                        "token",
                                        response.data.token
                                    );

                                    localStorage.setItem(
                                        "user",
                                        JSON.stringify(response.data.user)
                                    );

                                    navigate("/");
                                } catch (err) {
                                    console.error(err);
                                }
                            }}
                            onError={() => {
                                console.log("Google Login Failed");
                            }}
                        />
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-stone-400">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-[#2c1a0e] font-semibold hover:text-[#c89b3c] transition-colors"
                    >
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
}