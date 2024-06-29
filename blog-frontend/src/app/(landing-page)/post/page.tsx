"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function Home() {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<string | null>(null);
	const [isSearchFocused, setIsSearchFocused] = useState(false);

	const handleItemClick = (item: string) => {
		setSelectedItem(item);
	};

	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen);
	};

	const handleSearchFocus = () => {
		setIsSearchFocused(true);
	};

	const handleSearchBlur = () => {
		setIsSearchFocused(false);
	};

	return (
		<div>
			<div className="pl-0 pr-10 md:pr-60 py-5">
				<div className="flex items-center space-x-4">
					{/* Search */}
					<div className="relative flex-grow">
						{/* Mobile View: Show SearchSign initially */}
						<div
							className={`absolute inset-y-0 start-0 flex items-center ps-3 sm:pointer-events-auto ${
								isSearchFocused ? "hidden sm:flex" : "block sm:flex"
							}`}
						>
							<button onClick={handleSearchFocus} className="sm:hidden">
								<SearchSign propClass="" />
							</button>
							<SearchSign propClass="hidden sm:block" />
						</div>

						{/* Mobile View: Show Input when SearchSign is clicked */}
						{isSearchFocused && (
							<input
								type="search"
								id="default-search"
								className="block w-full p-3 ps-10 bg-custom-page-bg text-sm text-black border border-gray-300 rounded-lg sm:hidden"
								placeholder="Search"
								required
								onBlur={handleSearchBlur}
								autoFocus
							/>
						)}

						{/* Desktop View: Always show Input */}
						<input
							type="search"
							id="default-search"
							className="hidden sm:block w-full p-3 ps-10 bg-custom-page-bg text-sm text-black border border-gray-300 rounded-lg"
							placeholder="Search"
							required
						/>
					</div>

					{/* Dropdown and Create Button */}
					{!isSearchFocused && (
						<>
							{/* Dropdown */}
							<div className="relative">
								<button
									id="dropdownDefaultButton"
									onClick={toggleDropdown}
									className="text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
									type="button"
								>
									Community
									<svg
										className="w-2.5 h-2.5 ms-3"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 10 6"
									>
										<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
									</svg>
								</button>

								<div
									id="dropdown"
									className={`absolute top-full mt-2 ${
										dropdownOpen ? "block" : "hidden"
									} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 z-20`}
								>
									<ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
										<li className="flex items-center justify-between">
											<button
												onClick={() => handleItemClick("Dashboard")}
												className={`block px-4 py-2 items-center ${
													selectedItem === "Dashboard" ? "font-medium text-black" : ""
												}`}
											>
												Dashboard
											</button>
											{selectedItem === "Dashboard" && <TrueSign />}
										</li>
										<li className="flex items-center justify-between">
											<button
												onClick={() => handleItemClick("Settings")}
												className={`block px-4 py-2 items-center ${
													selectedItem === "Settings" ? "font-medium text-black" : ""
												}`}
											>
												Settings
											</button>
											{selectedItem === "Settings" && <TrueSign />}
										</li>
									</ul>
								</div>
							</div>

							{/* Create */}
							<button type="submit" className="text-white bg-custom-success font-medium rounded-lg text-sm px-6 py-3">
								Create+
							</button>
						</>
					)}
				</div>
			</div>

			{/* Content */}
			<Content />
		</div>
	);
}

const TrueSign = () => {
	return (
		<svg className="w-4 h-4 ml-2 mr-3 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
		</svg>
	);
};

const SearchSign = ({ propClass }: { propClass: string }) => {
	return (
		<svg
			className={`w-4 h-4 text-gray-500 dark:text-gray-400 ${propClass}`}
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 20 20"
		>
			<path
				stroke="currentColor"
				stroke-linecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
			/>
		</svg>
	);
};

const Content = () => {
	return (
		<div className="pl-0 pr-10 md:pr-60 py-5">
<div className="bg-white rounded-lg shadow-md ">
			<div className="container mx-auto">
				<div className="flex flex-row flex-wrap py-4">
					<aside className="w-full px-2">
						<div className="sticky top-0 p-4 w-fullrounded-lg">
							<div className="flex items-center mb-4">
							<Image className="rounded-full w-10 h-10 me-3" width={50} height={50} alt="icon" src="/assets/image/default.png" />
							<p className="text-header">Wittawat</p>
							</div>
							<div className="py-1 px-4 bg-gray-300	rounded-full w-max">
								<span className="text-slate-700	">History</span>
							</div>
							<h2 className="text-3xl	font-medium	mt-3">The Beginning of the End of the World</h2>
							<ul className="flex flex-col overflow-hidden rounded-lg">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur inventore illum recusandae et cupiditate eaque
								saepe provident repellendus sed voluptatum. Obcaecati cumque porro quia! Architecto iusto est ea aliquid cumque?
								consectetur adipisicing elit. Consequuntur inventore illum recusandae et cupiditate eaque
								saepe provident repellendus sed voluptatum. Obcaecati cumque porro quia! Architecto iusto est ea aliquid cumque?
							</ul>
							<div className="flex items-center mt-2">
								<Image width={25} height={25} alt="icon" src="/assets/image/message-circle-02.svg" />
								<span className="me-2 text-span">32</span>
								<span className="text-span">Comments</span>
							</div>
						</div>
					</aside>
				</div>
			</div>
		</div>
		</div>
		
	);
};
