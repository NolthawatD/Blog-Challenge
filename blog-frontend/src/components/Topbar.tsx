"use client";

import Image from "next/image";
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
				<div className="text-white text-2xl font-bold">
					<Image width={80} height={25} alt="icon" src="/assets/image/a-board.svg" />
				</div>
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
				<button className="absolute top-4 left-4 text-white mt-10" onClick={toggleMenu}>
					<Image width={20} height={25} alt="icon" src="/assets/image/ribbon-arrow.svg" />
				</button>
				<ul className="py-2 text-sm text-white dark:text-gray-200 mt-10 mx-3" aria-labelledby="dropdownDefaultButton">
					<li className="flex items-center justify-between mt-16">
						{/* Add home icon in front of Dashboard button */}
						<button className={`flex px-4 py-3  items-center ${true ? "font-medium text-white" : ""}`}>
							<Image width={20} height={25} alt="icon" src="/assets/image/ribbon-home.svg" />
							<span className="ml-3">Home</span>
						</button>
					</li>
					<li className="flex items-center justify-between">
						{/* Add pencil icon in front of Settings button */}
						<button className={`flex px-4 py-3  items-center ${true ? "font-medium text-white" : ""}`}>
							<Image width={25} height={25} alt="icon" src="/assets/image/ribbon-blog.svg" />
							<span className="ml-3">Our Blog</span>
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
			<path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
		</svg>
	);
};
