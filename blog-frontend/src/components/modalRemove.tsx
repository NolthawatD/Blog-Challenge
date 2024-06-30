import { backendAPI } from "@/hooks/apiConfig";
import React from "react";
import { useMutation, useQueryClient } from "react-query";

interface ModalRemoveProps {
	handleToggleRemove: (blogId: number | undefined) => void;
	blogRemoveId: number | undefined;
}

async function deleteBlog(blogId: number) {
	const response = await fetch(`${backendAPI}/post/${blogId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json();
}

export function ModalRemove({ handleToggleRemove, blogRemoveId }: ModalRemoveProps) {
	const queryClient = useQueryClient();

	const mutation = useMutation((blogId: number) => deleteBlog(blogId), {
		onSuccess: () => {
			queryClient.invalidateQueries("blogs");
			handleToggleRemove(undefined);
		},
	});

	const handleDelete = () => {
		if (blogRemoveId !== undefined) {
			mutation.mutate(blogRemoveId);
		}
	};

	return (
		<>
			<div className="">
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
									<button
										type="button"
										className="w-full sm:w-32 px-4 sm:px-6 py-2 border text-gray-500 rounded-md"
										onClick={() => handleToggleRemove(undefined)}
									>
										Cancel
									</button>
								</div>
								<div className="w-80 sm:w-auto">
									<button type="submit" className="w-full sm:w-32 px-4 sm:px-6 py-2 bg-red-500 text-white rounded-md" onClick={handleDelete}>
										Delete
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ModalRemove;
