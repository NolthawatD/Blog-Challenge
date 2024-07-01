"use client";

import { useSignIn } from "@/hooks/useSignIn";
import Image from "next/image";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SignIn = () => {
	const searchParams = useSearchParams();
	const event = searchParams.get("event");
	const [username, setUsername] = useState<string>("");
	const router = useRouter();

	const { refetch: signIn, data, isLoading, isError, error } = useSignIn(username);

	useEffect(() => {
		if (event !== "signIn") redirect("/blog");
	}, [event]);

	const handleSignIn = async () => {
		console.log("Func: handleSignIn", username);
		if (!username) return;
		const { data: response } = await signIn();
		if (response) {
			const { data } = response;
			localStorage.setItem("username", data.username);
			localStorage.setItem("userId", data.id);
		}
		router.push("/blog");
	};

	return (
		<div className="flex flex-col lg:flex-row h-screen bg-green-500 lg:bg-green-300">
			{/* Right side (a Board) */}
			<div className="flex-1 flex items-center justify-center p-4 lg:p-8 bg-green-300 lg:bg-green-500 lg:rounded-tl-3xl lg:rounded-bl-3xl rounded-bl-3xl rounded-br-3xl lg:rounded-br-none">
				<div className="text-white text-center justify-items-center lg:text-center">
					<Image
						className="w-32 h-30 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-80 lg:h-64 mx-auto"
						width={299.61}
						height={230}
						alt="icon"
						src="/assets/image/signIn.png"
					/>
					<Image
						className="w-20 h-30 mx-auto mt-5"
						width={100}
						height={230}
						alt="icon"
						src="/assets/image/a-board.svg"
					/>
				</div>
			</div>

			{/* Left side (SignInBox) */}
			<div className="flex-1 bg-green-500 lg:bg-green-300 flex items-center justify-center p-4 lg:p-8 order-last lg:order-first">
				<div className="w-full max-w-xs">
					<span className="block mb-3 text-4xl font-bold text-white">Sign in</span>
					<div className="py-4">
						<input
							type="text"
							className="w-full p-2 border border-gray-300 rounded-md placeholder-light text-gray-500"
							name="username"
							id="username"
							placeholder="Username"
							onChange={(e) => setUsername(e.target.value)} // Handle input change
						/>
					</div>
					<button className="w-full bg-custom-success text-white p-2 rounded-lg mb-6 hover:bg-green-400" onClick={() => handleSignIn()}>
						Sign In
					</button>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
