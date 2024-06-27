"use client";

import React, { useState } from "react";

const Topbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		console.log("Hey");
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<nav className="bg-green-500 p-4 fixed left-0 w-full z-10">
			<div className="flex items-center justify-between">
				<div className="text-white text-2xl font-bold">a Board</div>

				<div>
					<div className="py-2 px-8 bg-custom-success hover:bg-green-300 rounded-md group cursor-pointer hover:shadow-lg hidden md:block">
						<h3 className="text-white font-semibold">Sign in</h3>
					</div>

					{/* Toggle */}
					<div className="md:hidden">
						<button id="menu-toggle" className="text-white py-2" onClick={toggleMenu}>
							{isMenuOpen ? (
								<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
									<path d="M18 12l-6 6M18 12l-6-6"></path> {/* Right arrow for collapsing */}
								</svg>
							) : (
								<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
									<path d="M4 6h16M4 12h16M4 18h16"></path> {/* Hamburger menu for expanding */}
								</svg>
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			<div
				className={`fixed top-0 right-0 h-full w-3/4 bg-blue-700 text-white transform transition-transform duration-300 ease-in-out ${
					isMenuOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<button className="absolute top-4 left-4 text-white" onClick={toggleMenu}>
					<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
						<path d="M18 12l-6 6M18 12l-6-6"></path> {/* Right arrow for collapsing */}
					</svg>
				</button>
				<ul className="flex flex-col items-center mt-20">
					<li className="py-3">Home</li>
					<li className="py-3">Our Blog</li>
				</ul>
			</div>
		</nav>
	);
};

export default Topbar;
