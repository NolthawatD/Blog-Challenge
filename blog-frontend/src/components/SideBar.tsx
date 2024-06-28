import React from "react";

function Sidebar() {
	return (
		<div>
			<div className="p-6 w-1/2 h-screen z-0 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
				<div className="flex flex-col justify-start item-center">
					<div className=" mt-20 pb-4 ">
						<div className="flex mb-2 justify-start items-center gap-4 pl-5 p-2 cursor-pointer m-auto">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 text-gray-800 hover:text-white"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10 3a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 .293.707V15a2 2 0 0 1-2 2h-3v-4h-4v4H5a2 2 0 0 1-2-2v-3.586a1 1 0 0 1 .293-.707l7-7A1 1 0 0 1 10 3zm1 7V4.414L4.707 11H9a1 1 0 0 0 2 0h4.293L9 4.414V10h2z"
									clipRule="evenodd"
								/>
							</svg>
							<h3 className="text-base text-gray-800 hover:text-white font-semibold ">Home</h3>
						</div>
						<div className="flex mb-2 justify-start items-center gap-4 pl-5 p-2 cursor-pointer m-auto group-hover:text-white">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 text-gray-800 "
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M3.707 13.293a1 1 0 0 1 0 1.414l-2 2a1 1 0 0 1-1.414-1.414l2-2a1 1 0 0 1 1.414 0zm11.586-7.586L6 15l-2 2 9.293-9.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9.293 9.293 2 2 9.293-9.293a3 3 0 0 0 0-4.242l-2-2a3 3 0 0 0-4.242 0z"
									clipRule="evenodd"
								/>
							</svg>
							<h3 className="text-base text-gray-800 font-semibold ">Our Blog</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
