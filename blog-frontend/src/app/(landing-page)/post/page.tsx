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

	const [dropdownOpenModal, setDropdownOpenModal] = useState(false);
	const [selectedCommunity, setSelectedCommunity] = useState("");
	const communities = ["Community 1", "Community 2", "Community 3"]; // Add your communities here

	const toggleDropdownModal = () => setDropdownOpenModal(!dropdownOpen);
	const handleCommunitySelect = (community: string) => {
		setSelectedCommunity(community);
		setDropdownOpenModal(false);
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
			<div className="md:px-0 px-4">
				<Content />
			</div>

			<div>
				{/* <!-- Backdrop --> */}
				<div id="modal-backdrop" className="fixed inset-0 bg-black bg-opacity-70"></div>

				{/* <!-- Main modal --> */}
				<div
					id="crud-modal"
					tabIndex={-1}
					aria-hidden="true"
					className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full mr-10 mt-32 pb-20"
				>
					<div className="relative p-4 w-full max-w-md max-h-full">
						{/* <!-- Modal content --> */}
						<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
							{/* <!-- Modal header --> */}
							<div className="flex items-center justify-between px-4  pt-4 md:p-5">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create Post</h3>
								<button
									type="button"
									className="text-gray-700 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
									data-modal-toggle="crud-modal"
								>
									<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
										<path
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
										/>
									</svg>
								</button>
							</div>

							{/* Community selection dropdown */}
							<div className="px-4 mb-4">
								<label htmlFor="community" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Choose a community
								</label>
								<div className="relative">
									<button
										id="communityDropdown"
										onClick={toggleDropdownModal}
										type="button"
										className="w-full bg-white border border-green-600 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-green-600 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
									>
										{selectedCommunity || "Select a community"}
										<svg
											className="w-4 h-4 ml-2 absolute right-2.5 top-1/2 transform -translate-y-1/2"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 10 6"
										>
											<path
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="1"
												d="m1 1 4 4 4-4"
											/>
										</svg>
									</button>

									{dropdownOpenModal && (
										<ul className="absolute z-10 w-full py-2 mt-1 bg-white rounded-md shadow-lg dark:bg-gray-700">
											{communities.map((community) => (
												<li key={community}>
													<button
														onClick={() => handleCommunitySelect(community)}
														className={`flex justify-between items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 ${
															selectedCommunity === community ? "bg-green-100 dark:bg-gray-600" : ""
														}`}
													>
														<span>{community}</span>
														{selectedCommunity === community && (
															<svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
																<path
																	fillRule="evenodd"
																	d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
																	clipRule="evenodd"
																/>
															</svg>
														)}
													</button>
												</li>
											))}
										</ul>
									)}
								</div>
							</div>

							{/* <!-- Modal body --> */}
							<form className="p-4 md:p-5">
								<div className="grid gap-4 mb-4 grid-cols-2">
									<div className="col-span-2">
										<input
											id="title"
											className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="Title"
										></input>
									</div>
								</div>

								<div className="grid gap-4 mb-4 grid-cols-2">
									<div className="col-span-2">
										<textarea
											id="description"
											rows={4}
											className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="What's on your mind?"
										></textarea>
									</div>
								</div>

								<div className="flex flex-col items-center space-y-2 pt-2">
									<div className="flex w-full">
										<button className="w-full bg-white border border-green-600 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-green-600 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
											Cancel
										</button>
									</div>
									<div className="flex w-full">
										<button className="w-full bg-custom-success border-transparent text-white focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-green-600 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
											Post
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
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
		<div className="pl-0 py-5 md:pr-60">
			<div className="bg-white rounded-lg shadow-md ">
				<div className="container mx-auto">
					<div className="flex flex-row flex-wrap py-4">
						<aside className="w-full px-2">
							<div className="sticky top-0 p-4 w-fullrounded-lg">
								<div className="flex items-center mb-4">
									<Image
										className="rounded-full w-10 h-10 me-3"
										width={50}
										height={50}
										alt="icon"
										src="/assets/image/default.png"
									/>
									<p className="text-header">Wittawat</p>
								</div>
								<div className="py-1 px-4 bg-gray-300	rounded-full w-max">
									<span className="text-slate-700	">History</span>
								</div>
								<h2 className="text-3xl	font-medium	mt-3">The Beginning of the End of the World</h2>
								<ul className="flex flex-col overflow-hidden rounded-lg">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur inventore illum recusandae et cupiditate
									eaque saepe provident repellendus sed voluptatum. Obcaecati cumque porro quia! Architecto iusto est ea aliquid
									cumque? consectetur adipisicing elit. Consequuntur inventore illum recusandae et cupiditate eaque saepe provident
									repellendus sed voluptatum. Obcaecati cumque porro quia! Architecto iusto est ea aliquid cumque?
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
