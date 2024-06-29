import Sidebar from "@/components/SideBar";
import Topbar from "@/components/Topbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<Topbar />
			<div className="flex h-screen pt-16">
				<div className="hidden md:block w-1/4">
					<Sidebar />
				</div>
				<div className=" w-full md:w-3/4">{children}</div>
			</div>
		</div>
	);
};

export default layout;
