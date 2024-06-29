import React from "react";
import Image from "next/image";

export default function detail() {
	return (
		<div className="bg-white w-full">
			<div className=" pl-10 pr-10 md:pr-60 py-5">
				<div className="mb-10">
					<Image width={40} height={40} alt="icon" src="/assets/image/icon-arrow.svg" />
				</div>
				<div className="sticky top-0 p-4 w-fullrounded-lg">
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
				<div className="my-5">
					<button
						type="button"
						className="bg-white border border-green-600	 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-green-600 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
					>
						Add Comments
					</button>
				</div>

				<div>
					<div className="flex items-start mb-5">
						<Image className="rounded-full w-10 h-10 me-3" width={50} height={50} alt="icon" src="/assets/image/default.png" />
						<div>
							<p className="text-header mb-4">
								Wittawat <span className="text-span text-xs ms-3">5mo. ago</span>
							</p>
							<p>Lorem ipsum dolor sit amet consectetur. Purus cursus vel est a pretium quam imperdiet. Tristique auctor sed semper nibh odio iaculis sed aliquet. Amet mollis eget morbi feugiat mi risus eu. Tortor sed sagittis convallis auctor.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
