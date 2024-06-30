"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function detail() {
	return (
		<div className="bg-white w-full">
			<div className=" pl-10 pr-10 md:pr-60 py-5">
				<div className="mb-10">
					<Image width={40} height={40} alt="icon" src="/assets/image/icon-arrow.svg" />
				</div>
				<div className=" top-0 p-4 w-fullrounded-lg">
					<div className="flex items-center mb-5">
						<Image className="rounded-full w-10 h-10 me-3" width={50} height={50} alt="icon" src="/assets/image/default.png" />
						<p className="text-header">
							Wittawat <span className="text-span text-xs ms-3">5mo. ago</span>
						</p>
					</div>
					<div className="py-1 px-4 bg-gray-300	rounded-full w-max">
						<span className="text-slate-700	">History</span>
					</div>
					<h2 className="text-3xl	font-medium	mt-3">The Beginning of the End of the World</h2>
					<ul className="flex flex-col overflow-hidden rounded-lg ">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur inventore illum recusandae et cupiditate eaque saepe
						provident repellendus sed voluptatum. Obcaecati cumque porro quia! Architecto iusto est ea aliquid cumque? consectetur
						adipisicing elit. Consequuntur inventore illum recusandae et cupiditate eaque saepe provident repellendus sed voluptatum.
						Obcaecati cumque porro quia! Architecto iusto est ea aliquid cumque?
					</ul>
					<div className="flex items-center mt-5">
						<Image width={25} height={25} alt="icon" src="/assets/image/message-circle-02.svg" />
						<span className="me-2 text-span">32</span>
						<span className="text-span">Comments</span>
					</div>
				</div>
				<div className="my-5 block md:hidden">
					<button
						type="button"
						className="bg-white border border-green-600	 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-green-600 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
					>
						Add Comments mobile
					</button>
				</div>

				<div className="my-5 hidden md:block">
					<button
						type="button"
						className="bg-white border border-green-600	 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-green-600 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
					>
						Add Comments laptop
					</button>
				</div>

				<div className="hidden md:block">
					<div>
						<label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
						<textarea
							id="message"
							rows={4}
							className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Write your thoughts here..."
						></textarea>
					</div>

					<div className="flex justify-end my-4  ">
						<button
							type="button"
							className="bg-white border border-green-600	 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-green-600 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
						>
							Cancel
						</button>
						<button
							type="button"
							className="bg-custom-success border-transparent text-white focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-green-600 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
						>
							Post
						</button>
					</div>
				</div>

				<div>
					<div className="flex items-start mb-5">
						<Image className="rounded-full w-10 h-10 me-3" width={50} height={50} alt="icon" src="/assets/image/default.png" />
						<div>
							<p className="text-header mb-4">
								Wittawat <span className="text-span text-xs ms-3">5mo. ago</span>
							</p>
							<p>
								Lorem ipsum dolor sit amet consectetur. Purus cursus vel est a pretium quam imperdiet. Tristique auctor sed semper
								nibh odio iaculis sed aliquet. Amet mollis eget morbi feugiat mi risus eu. Tortor sed sagittis convallis auctor.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div>
				{/* <!-- Modal toggle --> */}

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
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Comments</h3>
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
							{/* <!-- Modal body --> */}
							<form className="p-4 md:p-5">
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
										<button
											type="submit"
											className="w-full bg-white border border-green-600 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-green-600 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
										>
											Cancel
										</button>
									</div>
									<div className="flex w-full">
										<button
											type="submit"
											className="w-full bg-custom-success border-transparent text-white focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-green-600 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
										>
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
