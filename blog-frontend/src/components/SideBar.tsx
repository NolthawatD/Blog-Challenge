import React from "react";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { Disclosure } from "@headlessui/react";
// import {
//   MdOutlineSpaceDashboard,
//   MdOutlineAnalytics,
//   MdOutlineIntegrationInstructions,
//   MdOutlineMoreHoriz,
//   MdOutlineSettings,
//   MdOutlineLogout,
// } from "react-icons/md";
// import { CgProfile } from "react-icons/cg";
// import { FaRegComments } from "react-icons/fa";
// import { BiMessageSquareDots } from "react-icons/bi";

function Sidebar() {
	return (
		<div>
			<div className="p-6 w-1/2 h-screen z-0 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
				<div className="flex flex-col justify-start item-center">
					<div className=" mt-20 pb-4 ">
						<div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
							{/* <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white " /> */}
							<h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">Home</h3>
						</div>
						<div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
							{/* <CgProfile className="text-2xl text-gray-600 group-hover:text-white " /> */}
							<h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">Our Blog</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
