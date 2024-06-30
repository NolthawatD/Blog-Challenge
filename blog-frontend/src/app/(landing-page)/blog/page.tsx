"use client";

import { fetchData } from "@/hooks/fetch";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

export default function Home() {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<string | null>(null);
	const [isSearchFocused, setIsSearchFocused] = useState(false);
	const [searchInput, setSearchInput] = useState("");

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

	const toggleDropdownModal = () => setDropdownOpenModal(!dropdownOpen);

	const handleCommunitySelect = (community: string) => {
		setSelectedCommunity(community);
		setDropdownOpenModal(false);
	};

	const [blogs, setBlogs] = useState([]);
	const [communities, setCommunities] = useState([]);
	const [communitySelect, setCommunitySelect] = useState<number[]>([]);

	const handleCommunity = (comId: number) => {
		setCommunitySelect((prevCommunitySelect) => {
			if (prevCommunitySelect.includes(comId)) {
				return prevCommunitySelect.filter((id) => id !== comId);
			} else {
				return [...prevCommunitySelect, comId];
			}
		});
	};

	const {
		data: communityData,
		isLoading: communityIsLoading,
		error: communityError,
	} = useQuery("communities", () => fetchData("community"), {
		onSuccess: (data) => {
			setCommunities(data.datas);
		},
	});
	// Blog query

	const {
		data: blogData,
		isLoading: blogIsLoading,
		error: blogError,
		refetch: blogRefetch,
	} = useQuery(
		"blogs",
		() =>
			fetchData("post", {
				authorId: "",
				title: searchInput,
				content: "",
				communityId: JSON.stringify([1, 2]),
				page: 1,
				limit: 10,
			}),
		{
			onSuccess: (data) => {
				console.log("%c === ", "color:cyan", "  data", data?.data?.result);
				setBlogs(data?.data?.result);
			},
		}
	);

	useEffect(() => {
		if (!communityIsLoading && !blogIsLoading) {
			console.log("Both queries are complete");
		}
	}, [communityIsLoading, blogIsLoading]);

	useEffect(() => {
		blogRefetch();
	}, [searchInput]);

	return (
		<div>
			<div className="pl-0 pr-10 md:pr-60 py-5 mt-7">
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
								onChange={(e: any) => setSearchInput(e.target.value)}
							/>
						)}

						{/* Desktop View: Always show Input */}
						<input
							type="search"
							id="default-search"
							className="hidden sm:block w-full p-3 ps-10 bg-custom-page-bg text-sm text-black border border-gray-300 rounded-lg"
							placeholder="Search"
							required
							onChange={(e: any) => setSearchInput(e.target.value)}
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
										{communities?.map((community: any) => (
											<li className="flex items-center justify-between" key={community.name}>
												<button
													onClick={() => handleCommunity(community.id)}
													className={`block px-4 py-2 items-center ${
														communitySelect.includes(community.id) ? "font-medium text-black" : ""
													}`}
												>
													{community.name}
												</button>
												{communitySelect.includes(community.id) && <TrueSign />}
											</li>
										))}
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
				<div className="pl-0 py-5 md:pr-60">
					<div className="bg-white rounded-lg shadow-md border-b-2">
						{blogs?.map((blog: any) => (
							<div className="container mx-auto" key={blog?.id + Math.random()}>
								<div className="flex flex-row flex-wrap py-4">
									<aside className="w-full px-2 ">
										<div className="sticky top-0 p-4 w-fullrounded-lg">
											<div className="flex items-center mb-4">
												<Image
													className="rounded-full w-10 h-10 me-3"
													width={50}
													height={50}
													alt="icon"
													src="/assets/image/default.png"
												/>
												<p className="text-header">{blog?.author?.username}</p>
											</div>
											<div className="py-1 px-4 bg-gray-300	rounded-full w-max">
												<span className="text-slate-700	">{blog?.community?.name}</span>
											</div>
											<h2 className="text-3xl	font-medium	mt-3">{blog?.title}</h2>
											<ul className="flex flex-col overflow-hidden rounded-lg">{blog?.content?.slice(0, 500) + "..."}</ul>
											<div className="flex items-center mt-2 ">
												<Image width={25} height={25} alt="icon" src="/assets/image/message-circle-02.svg" />
												<span className="me-2 text-span">{blog?.comments?.length}</span>
												<span className="text-span">Comments</span>
											</div>
										</div>
									</aside>
								</div>
								<hr className="h-px  bg-gray-400 border-0 dark:bg-gray-700" />
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="hidden">
				{/* <!-- Backdrop --> */}
				<div id="modal-backdrop" className="fixed inset-0 bg-black bg-opacity-50"></div>

				{/* <!-- Main modal --> */}
				<div
					id="crud-modal"
					tabIndex={-1}
					aria-hidden="true"
					className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-3xl "
				>
					<div className="relative bg-white rounded-lg shadow-xl sm:mx-0 mx-4">
						{/* <!-- Modal header --> */}
						<div className="flex items-center justify-between p-6 border-b">
							<h3 className="text-xl font-semibold text-gray-900">Create Post</h3>
							<button
								type="button"
								className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
								data-modal-toggle="crud-modal"
							>
								<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
									/>
								</svg>
							</button>
						</div>

						<form className="p-6">
							{/* Community selection dropdown */}
							<div className="mb-4">
								<button
									id="communityDropdown"
									onClick={toggleDropdownModal}
									type="button"
									className="w-full md:w-auto bg-white border border-custom-success text-custom-success hover:bg-green-50 font-medium rounded-md text-sm px-4 py-2.5 text-left inline-flex items-center justify-between"
								>
									{selectedCommunity || "Choose a community"}
									<svg
										className="w-4 h-4 ml-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
									</svg>
								</button>

								{dropdownOpenModal && (
									<div className="relative">
										<ul className="absolute z-10 w-full py-2 mt-1 bg-white rounded-md shadow-lg">
											{communities.map((community) => (
												<li key={community}>
													<button
														onClick={() => handleCommunitySelect(community)}
														className={`flex justify-between items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 ${
															selectedCommunity === community ? "bg-green-50" : ""
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
									</div>
								)}
							</div>

							<input
								id="title"
								className="block p-2.5 mb-4 w-full text-sm text-gray-900 bg-white rounded-md border border-gray-300 focus:ring-green-500 focus:border-green-500"
								placeholder="Title"
							/>

							<textarea
								id="description"
								rows={10}
								className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-md border border-gray-300 focus:ring-green-500 focus:border-green-500"
								placeholder="What's on your mind..."
							></textarea>

							<div className="flex flex-col-reverse sm:flex-row sm:justify-end items-center space-y-4 space-y-reverse sm:space-y-0 sm:space-x-4 mt-6">
								<div className="w-80 sm:w-auto">
									<button
										type="button"
										className="w-full sm:w-32 px-4 sm:px-6 py-2 rounded-md border border-custom-success text-custom-success"
									>
										Cancel
									</button>
								</div>
								<div className="w-80 sm:w-auto">
									<button type="submit" className="w-full sm:w-32 px-4 sm:px-6 py-2 bg-custom-success text-white rounded-md">
										Post
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

const TrueSign = () => {
	return (
		<svg className="w-4 h-4 ml-2 mr-3 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
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
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
			/>
		</svg>
	);
};
