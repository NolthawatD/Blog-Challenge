import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/SideBar";
import Topbar from "@/components/Topbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className}`}>
				<Topbar />

				<div className="flex h-screen pt-20">
					<div className="hidden md:block w-1/4">
						<Sidebar />
					</div>
					<div className="w-full md:w-2/4 ">
						<main>{children}</main>
					</div>
					<div className="hidden md:block w-1/4 ">
					</div>
				</div>
			</body>
		</html>
	);
}
