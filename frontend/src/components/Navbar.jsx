import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import ChefHat from "../assets/ChefHat.png";
import { FaRightFromBracket } from "react-icons/fa6";

function Navbar() {
    const navigate = useNavigate();

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
        <nav className="w-full flex items-center justify-between px-10 py-4 bg-linear-to-r from-[#2b1b12] to-[#1f140d] text-white shadow-md">

            <div>
                <Link to="/" className='flex items-center'>
                    <img src={ChefHat} alt="Chef" className="h-15 w-15" />
                    <span className="text-2xl font-bold font-Poppins text-[#D4AF37]">
                        GPT
                    </span>
                </Link>
            </div>

            <div className="flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2">
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

            <div>
                <NavLink onClick={handleLogout}>
                    <button className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg font-medium transition-all duration-200">
                        <FaRightFromBracket />
                    </button>
                </NavLink>
            </div>

        </nav>
    );
}

export default Navbar;