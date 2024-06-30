import Image from "next/image";
import React from "react";

function Sidebar() {
	return (
		<div>
			<div className="p-6 w-1/2 h-screen z-0 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
				<div className="flex flex-col justify-start item-center">
					<div className=" mt-20 pb-4 ">
						<div className="flex mb-2 justify-start items-center gap-4 pl-5 p-2 cursor-pointer m-auto">
							<Image width={25} height={25} alt="icon" src="/assets/image/sidebar-home.svg" />
							<h3 className="text-base text-gray-800 hover:text-white font-semibold ">Home</h3>
						</div>
						<div className="flex mb-2 justify-start items-center gap-4 pl-5 p-2 cursor-pointer m-auto group-hover:text-white">
							<Image width={25} height={25} alt="icon" src="/assets/image/sidebar-our-blog.svg" />

							<h3 className="text-base text-gray-800 font-semibold ">Our Blog</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
