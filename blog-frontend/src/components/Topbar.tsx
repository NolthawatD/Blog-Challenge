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
					<div className="py-2 px-8 bg-custom-success hover:bg-green-300 rounded-md group cursor-pointer hover:shadow-lg hidden md:block mb">
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
				className={`fixed top-0 right-0 h-full w-3/4 bg-green-500 text-white transform transition-transform duration-300 ease-in-out ${
					isMenuOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<button className="absolute top-4 left-4 text-white" onClick={toggleMenu}>
					<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
						<path d="M18 12l-6 6M18 12l-6-6"></path> {/* Right arrow for collapsing */}
					</svg>
				</button>
				<ul className="py-2 text-sm text-white dark:text-gray-200 mt-10 mx-3" aria-labelledby="dropdownDefaultButton">
					<li className="flex items-center justify-between">
						{/* Add home icon in front of Dashboard button */}
						<button className={`flex px-4 py-3  items-center ${true ? "font-medium text-white" : ""}`}>
							<svg
								className="w-4 h-4 me-2"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								aria-hidden="true"
							>
								<path d="M10 2.5L2 9.5V18a1 1 0 001 1h5a1 1 0 001-1v-4h2v4a1 1 0 001 1h5a1 1 0 001-1V9.5l-8-7z" />
							</svg>
							Dashboard
						</button>
					</li>
					<li className="flex items-center justify-between">
						{/* Add pencil icon in front of Settings button */}
						<button className={`flex px-4 py-3  items-center ${true ? "font-medium text-white" : ""}`}>
							<svg
								className="w-4 h-4 me-2"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								aria-hidden="true"
							>
								<path d="M15.586 3.586a2 2 0 010 2.828L7.707 14.293a1 1 0 01-.293.207l-3 1a1 1 0 01-1.271-1.271l1-3a1 1 0 01.207-.293l7.879-7.879a2 2 0 012.828 0zm-2.828-1.414a4 4 0 00-5.656 0l-7.879 7.879a3 3 0 00-.586 1.415l-1 3a3 3 0 003.707 3.707l3-1a3 3 0 001.415-.586l7.879-7.879a4 4 0 000-5.656z" />
							</svg>
							Settings
						</button>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Topbar;

const TrueSign = () => {
	return (
		<svg className="w-4 h-4 ml-2 mr-3 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
		</svg>
	);
};
