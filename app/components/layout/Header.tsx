import React, { FC, ReactNode } from "react";
import { NavLink } from "remix";

const Header: FC = function Header() {
    const activeClass = "p-2 lg:px-4 md:mx-2 text-white rounded bg-indigo-600";
    const linkClass = "p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300";
    
    return (
        <div className="header-2 fixed w-full">
            <nav className="bg-white py-2 md:py-4">
                <div className="container px-4 mx-auto md:flex md:items.center">
                    <div className="flex justify-between items-center">
                        <a href="#" className="font-bold text-xl text-indigo-600">Company-Automator</a>
                        <button className="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden" id="navbar-toggle">
                            <i className="fas fa-bars"></i>
                        </button>
                    </div>

                    <div className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0" id="navbar-collapse">
                        <NavLink to="" className={({ isActive }) => isActive ? activeClass : linkClass}>Home</NavLink>
                        <NavLink to="analytics" className={({ isActive }) => isActive ? activeClass : linkClass}>Analytics</NavLink>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header;