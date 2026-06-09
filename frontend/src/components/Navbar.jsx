import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
    const handleLogout = () => {
        localStorage.removeItem("token");
        // logout logic
    };

    return (
        <nav className="w-full flex items-center justify-between px-10 py-4 bg-linear-to-r from-[#2b1b12] to-[#1f140d] text-white shadow-md">

            {/* Left - Logo */}
            <div>
                <Link to="/">
                    <span className="text-2xl font-bold font-serif text-amber-400">
                        Chef<span className="text-white italic">GPT</span>
                    </span>
                </Link>
            </div>

            {/* Center - Navigation Links */}
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

            {/* Right - Logout */}
            <div>
                <NavLink onClick={handleLogout}>
                    <button className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg font-medium transition-all duration-200">
                        Logout
                    </button>
                </NavLink>
            </div>

        </nav>
    );
}

export default Navbar;