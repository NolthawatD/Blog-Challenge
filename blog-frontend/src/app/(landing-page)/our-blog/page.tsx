"use client";

import ContentBlog from "@/components/content";
import SearchBar from "@/components/searchBar";
import { fetchData } from "@/hooks/fetch";
import { mutationData } from "@/hooks/mutation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query";

export default function Home() {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [dropdownOpenModal, setDropdownOpenModal] = useState(false);
	const [selectedCommunity, setSelectedCommunity] = useState("");

	const toggleDropdownModal = () => setDropdownOpenModal(!dropdownOpen);
	const handleCommunitySelect = (community: string) => {
		setSelectedCommunity(community);
		setDropdownOpenModal(false);
	};

	const [toggleModalEdit, setToggleModalEdit] = useState(false);

	const [blogs, setBlogs] = useState<any[]>([]);
	const [communities, setCommunities] = useState([]);

	return (
		<div>
			<SearchBar setBlogs={setBlogs} />
			<ContentBlog blogs={blogs} />

			{toggleModalEdit && (
				<div>
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
								<h3 className="text-xl font-semibold text-gray-900">Edit Post</h3>
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
			)}

			{/* <!-- Confirm Modal --> */}

			<div className="hidden">
				{/* <!-- Backdrop --> */}
				<div id="modal-backdrop" className="fixed inset-0 bg-black bg-opacity-50"></div>

				{/* <!-- Main modal --> */}
				<div
					id="crud-modal"
					tabIndex={-1}
					aria-hidden="true"
					className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm"
				>
					<div className="relative bg-white rounded-lg shadow-xl sm:mx-0 mx-4">
						{/* Modal header */}
						<div className="pt-6">
							<h3 className="tracking-tighter text-2xl text-center font-medium text-black md:text-xl dark:text-gray-400 pb-3 md:mx-14">
								Please confirm if you wish to delete the post
							</h3>
							<p className="tracking-tighter text-gray-500 text-center md:text-lg dark:text-gray-400 md:mx-5">
								Are you sure you want to delete the post? Once deleted, it cannot be recovered.
							</p>
						</div>
						<div className="pb-6">
							<div className="flex flex-col-reverse sm:flex-row justify-center items-center space-y-4 space-y-reverse sm:space-y-0 sm:space-x-4 mt-6">
								<div className="w-80 sm:w-auto">
									<button type="button" className="w-full sm:w-32 px-4 sm:px-6 py-2 border text-gray-500 rounded-md">
										Cancel
									</button>
								</div>
								<div className="w-80 sm:w-auto">
									<button type="submit" className="w-full sm:w-32 px-4 sm:px-6 py-2 bg-red-500 text-white rounded-md">
										Delete
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* <!-- End Confirm Modal --> */}
		</div>
	);
}
