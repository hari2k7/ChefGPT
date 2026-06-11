import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import ChefHat from "../assets/ChefHat.png";
import { FaRightFromBracket } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

function Navbar() {
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        const confirmLogout = window.confirm(
            "Are you sure you want to logout?"
        );

        if (!confirmLogout) return;

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <nav className="w-full bg-gradient-to-r from-[#2b1b12] to-[#1f140d] text-white shadow-md relative">
            <div className="flex items-center justify-between px-4 md:px-10 py-4">

                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <img src={ChefHat} alt="Chef" className="h-12 w-12 md:h-15 md:w-15" />
                    <span className="text-xl md:text-2xl font-bold text-[#D4AF37]">
                        GPT
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `px-5 py-3 rounded-xl transition-all duration-200
                    ${isActive
                                ? "bg-[#3a2a20] text-amber-400 font-semibold"
                                : "text-gray-200 hover:text-amber-400"}`
                        }
                    >
                        Generate
                    </NavLink>

                    <NavLink
                        to="/cookbook"
                        className={({ isActive }) =>
                            `px-5 py-3 rounded-xl transition-all duration-200
                    ${isActive
                                ? "bg-[#3a2a20] text-amber-400 font-semibold"
                                : "text-gray-200 hover:text-amber-400"}`
                        }
                    >
                        My Cookbook
                    </NavLink>
                </div>

                {/* Desktop Logout */}
                <div className="hidden md:block">
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg transition"
                    >
                        <FaRightFromBracket />
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="md:hidden flex flex-col gap-2 px-4 pb-4 bg-[#2b1b12] border-t border-white/10">
                    <NavLink
                        to="/"
                        onClick={() => setMenuOpen(false)}
                        className="py-3 text-center rounded-lg hover:bg-[#3a2a20]"
                    >
                        Generate
                    </NavLink>

                    <NavLink
                        to="/cookbook"
                        onClick={() => setMenuOpen(false)}
                        className="py-3 text-center rounded-lg hover:bg-[#3a2a20]"
                    >
                        My Cookbook
                    </NavLink>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 py-3 rounded-lg flex justify-center"
                    >
                        <FaRightFromBracket />
                    </button>
                </div>
            )}
        </nav>
    );
}

export default Navbar;