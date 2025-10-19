import React from "react";
import { useState } from "react";
import {Link} from 'react-router-dom';
import { HiMenu, HiX ,HiUserCircle } from 'react-icons/hi';


function Nav(){
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full bg-white/30 backdrop-blur-md border-b border-white/20 shadow-md px-4 py-3 flex items-center justify-between sticky top-0 z-50">
            <div className="text-2xl font-bold text-blue-600">
                <Link to='/'>Habique</Link>
            </div>

            {/* Hamburger Icon */}
            <button
                className="sm:hidden text-3xl text-blue-600"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <HiX /> : <HiMenu />}
            </button>

            {/* Desktop Links */}
            <div className="hidden sm:flex gap-10 text-blue-600 font-medium justify-center items-center">
                <Link to="/" className="relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
>Dashboard</Link>
                <Link to="/analytics" className="relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">Analytics</Link>
                <Link to="/settings" className="relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">Settings</Link>
                <Link to = "/profile">
                <HiUserCircle size={40} color="blue" />
                </Link>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="absolute top-[4rem] left-0 w-full bg-white shadow-md sm:hidden flex flex-col items-center gap-4 py-4 z-10">
                <Link
                    to="/"
                    className="relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
                    onClick={() => setIsOpen(false)}
                >
                    Dashboard
                </Link>
                <Link
                    to="/analytics"
                    className="relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
                    onClick={() => setIsOpen(false)}
                >
                    Analytics
                </Link>
                <Link
                    to="/settings"
                    className="relative inline-block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
                    onClick={() => setIsOpen(false)}
                >
                    Settings
                </Link>
                <Link to = "/profile" onClick={() => setIsOpen(false)}>
                    <HiUserCircle size={40} color="blue" />
                </Link>
                </div>
            )}
        </nav>

    );
}

export default Nav;