"use client"

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function Sidebar() {
	const router = useRouter();
	const [isOpenHome, setIsOpenHome] = useState(false)
	const [isOpenOur, setIsOpenOur] = useState(false)

	const handleOpenHome = () => { 
		setIsOpenHome(!isOpenHome)
		setIsOpenOur(false)
		router.push('/blog')
	}

	const handleOpenOur = () => { 
		setIsOpenOur(!isOpenOur)
		setIsOpenHome(false)
		router.push('/our-blog')
	}

	return (
		<div>
			<div className="p-6 w-1/2 h-screen z-0 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
				<div className="flex flex-col justify-start item-center">
					<div className=" mt-20 pb-4 ">
						<div className="flex mb-2 justify-start items-center gap-4 pl-5 p-2 cursor-pointer m-auto" onClick={() => handleOpenHome()}>
							<Image width={25} height={25} alt="icon" src="/assets/image/sidebar-home.svg" />
							<h3 className={`text-base hover:text-black font-semibold ${isOpenHome ? "text-black": "text-gray-600"}`}>Home</h3>
						</div>
						<div className="flex mb-2 justify-start items-center gap-4 pl-5 p-2 cursor-pointer m-auto group-hover:text-white" onClick={() => handleOpenOur()}>
							<Image width={25} height={25} alt="icon" src="/assets/image/sidebar-our-blog.svg" />
							<h3 className={`text-base hover:text-black font-semibold ${isOpenOur ? "text-black": "text-gray-600"}`}>Our Blog</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
