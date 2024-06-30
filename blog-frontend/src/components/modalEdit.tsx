"use-client";

import { backendAPI } from "@/hooks/apiConfig";
import { fetchData } from "@/hooks/fetch";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

interface ModalEditProps {
	handleToggleEdit: (blogEdit: any) => void;
	blogEdit: any;
}

async function editBlog(blogId: number, blog: {}) {
	const response = await fetch(`${backendAPI}/post/${blogId}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(blog),
	});

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json();
}

export function ModalEdit({ handleToggleEdit, blogEdit }: ModalEditProps) {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [dropdownOpenModal, setDropdownOpenModal] = useState(false);
	const [selectedCommunityId, setSelectedCommunityId] = useState<number | null>();
	const [selectedCommunityName, setSelectedCommunityName] = useState<string>("");
	const [communities, setCommunities] = useState([]);
	const [editTitle, setEditTitle] = useState<string | undefined>("");
	const [editContent, setEditContent] = useState<string | undefined>("");

	const toggleDropdownModal = () => setDropdownOpenModal(!dropdownOpen);
	const handleCommunitySelect = (communityId: number, communityName: string) => {
		setSelectedCommunityId(communityId);
		setSelectedCommunityName(communityName);
		setDropdownOpenModal(false);
	};

	useEffect(() => {
		setEditTitle(blogEdit?.title);
		setEditContent(blogEdit?.content);
	}, [blogEdit]);

	const {
		data: communityData,
		isLoading: communityIsLoading,
		error: communityError,
	} = useQuery("communities", () => fetchData("community"), {
		onSuccess: (data) => {
			setCommunities(data.datas);
		},
	});

	const handleEditBlog = async () => {
		const _blogEdit = {
			title: editTitle,
			content: editContent,
		};
		await editBlog(blogEdit?.id, _blogEdit);
		handleToggleEdit(undefined)
	};

	return (
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
							onClick={() => handleToggleEdit(undefined)}
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
								{selectedCommunityName || "Choose a community"}
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
										{communities?.map((community: any) => (
											<li key={community?.name + Math.random().toString()}>
												<button
													onClick={() => handleCommunitySelect(community?.id, community?.name)}
													className={`flex justify-between items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 ${
														selectedCommunityId === community?.id ? "bg-green-50" : ""
													}`}
												>
													<span>{community?.name}</span>
													{selectedCommunityId === community?.id && (
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
							value={editTitle}
							onChange={(e) => setEditTitle(e.target.value)}
						/>

						<textarea
							id="description"
							rows={10}
							className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-md border border-gray-300 focus:ring-green-500 focus:border-green-500"
							placeholder="What's on your mind..."
							value={editContent}
							onChange={(e) => setEditContent(e.target.value)}
						></textarea>

						<div className="flex flex-col-reverse sm:flex-row sm:justify-end items-center space-y-4 space-y-reverse sm:space-y-0 sm:space-x-4 mt-6">
							<div className="w-80 sm:w-auto">
								<button
									type="button"
									className="w-full sm:w-32 px-4 sm:px-6 py-2 rounded-md border border-custom-success text-custom-success"
									onClick={() => handleToggleEdit(undefined)}
								>
									Cancel
								</button>
							</div>
							<div className="w-80 sm:w-auto" onClick={() => handleEditBlog()}>
								<button type="submit" className="w-full sm:w-32 px-4 sm:px-6 py-2 bg-custom-success text-white rounded-md">
									Confirm
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default ModalEdit;
