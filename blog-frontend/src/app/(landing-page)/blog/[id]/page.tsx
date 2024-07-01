"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchData } from "@/hooks/fetch";
import { mutationData } from "@/hooks/mutation";
import useSocket from "@/hooks/useSocket";
import { backendAPI } from "@/hooks/apiConfig";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addLocale(en);

export default function Detail() {
	const router = useRouter();
	const params = useParams();
	const queryClient = useQueryClient();
	const socket = useSocket(`${backendAPI}/events`);
	const [blogDetail, setBlogDetail] = useState<any>();
	const [toggleCommentLaptop, setToggleCommentLaptop] = useState<boolean>(false);
	const [commentInput, setCommentInput] = useState<string>("");
	const [commenterId, setCommenterId] = useState<number | null>();
	const [toggleModalComment, setToggleModalComment] = useState(false);
	const [signInList, setSignInList] = useState<unknown[]>([]);

	// console.log("%c === ","color:cyan","  blogDetail", blogDetail);

	useEffect(() => {
		const _commenterId = localStorage.getItem("userId");
		setCommenterId(Number(_commenterId));
	}, []);

	const {
		data: postData,
		isLoading: postIsLoading,
		error: postError,
	} = useQuery("post", () => fetchData(`post/${params?.id}`, {}), {
		onSuccess: (data) => {
			setBlogDetail(data.data);
		},
	});

	const mutation = useMutation((comment: {}) => mutationData("comment", comment), {
		onSuccess: () => {
			queryClient.invalidateQueries("post");
		},
	});

	const handleComment = () => {
		if (!commenterId) {
			alert("Please sign in");
			return;
		}
		if (!commentInput) {
			alert("Please enter comment");
			return;
		}
		const _comment = {
			postId: params?.id,
			comment: commentInput,
			commenterId: commenterId,
		};
		mutation.mutate(_comment);
		setCommentInput("");
		setToggleModalComment(false);
		setToggleCommentLaptop(false);
	};

	useEffect(() => {
		if (socket) {
			socket.on("connect", () => {
				console.log("socket connected");
			});

			socket.on("allSignIn", (events) => {
				console.log("%c === ", "color:red", "  events", events);
				setSignInList(events);
			});

			socket.on("newSignIn", (event) => {
				console.log("%c === ", "color:orange", "  event", event);
				setSignInList((prev) => [...prev, event]);
			});

			socket.on("disconnectSignIn", (event) => {
				setSignInList((prev) => prev.filter((e: any) => e?.signInId !== event?.signInId));
			});
			if (commenterId) {
				socket.emit("signIn", commenterId);
			}
		}
		return () => {
			if (socket) {
				socket.off("connect");
				socket.off("allSignIn");
				socket.off("newSignIn");
				socket.off("clientDisconnected");
			}
		};
	}, [socket]);

	const updatePostDetail = () => {
		const signInIdList = signInList.map((s: any) => s.signInId);
		setBlogDetail((prev: any) => {
			const is_online = signInIdList?.includes(prev?.author_id);
			return {
				...prev,
				is_online,
			};
		});
	};

	useEffect(() => {
		if (signInList?.length > 0) {
			updatePostDetail();
		}
	}, [signInList]);

	function parseDate(dateString: any) {
		return new Date(Date.parse(dateString));
	}

	return (
		<div className="bg-white w-full">
			<div className=" pl-10 pr-10 md:pr-60 py-5">
				<div className="mb-10">
					<Image
						className="hover:cursor-pointer "
						width={40}
						height={40}
						alt="icon"
						src="/assets/image/icon-arrow.svg"
						onClick={() => router.push("/blog")}
					/>
				</div>
				<div className=" top-0 p-4 w-fullrounded-lg">
					<div className="flex items-center mb-5">
						<div className="relative inline-block">
							<Image className="rounded-full w-10 h-10 mr-3" width={50} height={50} alt="icon" src="/assets/image/default.png" />
							{blogDetail?.is_online && (
								<span className="absolute bottom-0 right-0 w-3 h-3 bg-custom-success border-2 border-white rounded-full"></span>
							)}
						</div>
						<p className="text-header">
							{blogDetail?.author?.username}{" "}
							<span className="text-span text-xs ms-3">{<ReactTimeAgo date={parseDate(blogDetail?.created_at || new Date())} locale="en-US" timeStyle="mini"/>}. ago</span>
						</p>
					</div>
					<div className="py-1 px-4 bg-gray-300	rounded-full w-max">
						<span className="text-slate-700	">{blogDetail?.community?.name}</span>
					</div>
					<h2 className="text-3xl	font-medium	mt-3">{blogDetail?.title}</h2>
					<ul className="flex flex-col overflow-hidden rounded-lg ">{blogDetail?.content}</ul>

					<div className="flex items-center mt-5">
						<Image width={25} height={25} alt="icon" src="/assets/image/message-circle-02.svg" />
						<span className="me-2 text-span">{blogDetail?.comments?.length}</span>
						<span className="text-span">Comments</span>
					</div>
				</div>

				<div className="pl-5">
					{/* Mobile */}
					<div className="my-5 block md:hidden">
						<button
							type="button"
							onClick={() => setToggleModalComment(!toggleModalComment)}
							className="bg-white border border-custom-success text-custom-success focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-custom-success dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
						>
							Add Comments
						</button>
					</div>
					{/* End Mobile */}

					{/* LAPTOP */}
					<div className="my-5 hidden md:block">
						<button
							type="button"
							onClick={() => setToggleCommentLaptop(!toggleCommentLaptop)}
							className="bg-white border border-custom-success	text-custom-success focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-custom-success dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
						>
							Add Comments
						</button>
					</div>

					{toggleCommentLaptop && (
						<div className="hidden md:block">
							<div>
								<label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
								<textarea
									id="message"
									rows={4}
									className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Write your thoughts here..."
									onChange={(e: any) => setCommentInput(e.target.value)}
								></textarea>
							</div>

							<div className="flex justify-end my-4  ">
								<button
									type="button"
									className="bg-white border border-custom-success	text-custom-success focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-custom-success dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
								>
									Cancel
								</button>
								<button
									type="button"
									onClick={handleComment}
									className="bg-custom-success border-custom-succes text-white focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-custom-success dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
								>
									Post
								</button>
							</div>
						</div>
					)}
					{/* END LAPTOP */}

					{blogDetail?.comments?.map((comment: any) => (
						<div key={comment?.id + Math.random()}>
							<div className="flex items-start mb-5">
								<Image className="rounded-full w-10 h-10 me-3" width={50} height={50} alt="icon" src="/assets/image/default.png" />
								<div>
									<p className="text-header mb-4">
										{comment?.commenter?.username} <span className="text-span text-xs ms-3">5mo. ago {comment?.created_at}</span>
									</p>
									<p>{comment?.comment}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<div>
				{/* <!-- Modal toggle --> */}

				{/* <!--  Mobile --> */}
				{toggleModalComment && (
					<div
						id="crud-modal"
						tabIndex={-1}
						aria-hidden="true"
						className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full mr-10 mt-32 pb-20"
					>
						<div id="modal-backdrop" className="fixed inset-0 bg-black bg-opacity-70"></div>

						<div className="relative p-4 w-full max-w-md max-h-full">
							{/* <!-- Modal content --> */}
							<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
								{/* <!-- Modal header --> */}
								<div className="flex items-center justify-between px-4  pt-4 md:p-5">
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Comments</h3>
									<button
										type="button"
										className="text-gray-700 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
										data-modal-toggle="crud-modal"
										onClick={() => setToggleModalComment(!toggleModalComment)}
									>
										<svg
											className="w-3 h-3"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 14 14"
										>
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
								{/* <!-- Modal body --> */}
								<form className="p-4 md:p-5">
									<div className="grid gap-4 mb-4 grid-cols-2">
										<div className="col-span-2">
											<textarea
												id="description"
												rows={4}
												className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="What's on your mind?"
												onChange={(e: any) => setCommentInput(e.target.value)}
											></textarea>
										</div>
									</div>

									<div className="flex flex-col items-center space-y-2 pt-2">
										<div className="flex w-full">
											<button
												type="submit"
												onClick={() => setToggleModalComment(!toggleModalComment)}
												className="w-full bg-white border border-custom-success focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-custom-success dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
											>
												Cancel
											</button>
										</div>
										<div className="flex w-full">
											<button
												type="submit"
												onClick={handleComment}
												className="w-full bg-custom-success border-transparent text-white focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-custom-success dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
											>
												Post
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
