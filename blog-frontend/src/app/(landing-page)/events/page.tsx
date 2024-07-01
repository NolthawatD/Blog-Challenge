"use client";

import useSocket from "@/hooks/useSocket";
import { useEffect, useState } from "react";

export default function Home() {
	const socket = useSocket("http://localhost:8080/events");
	const [isConnected, setIsConnected] = useState<boolean>(false);
	const [lastPong, setLastPong] = useState<string | null>(null);

	useEffect(() => {
		if (socket) {
			socket.on("connect", () => {
				setIsConnected(true);
			});

			socket.on("disconnect", () => {
				setIsConnected(false);
			});

			socket.on("pong", (data: string) => {
				setLastPong(data);
			});

			socket.on("allSignIn", (events) => {
				console.log("All sign-in events:", events);
			});

			socket.on("newSignIn", (event) => {
				console.log("New sign-in event:", event);
			});

			socket.on("clientDisconnected", (event) => {
				console.log("clientDisconnected event:", event);
			});
		}

		return () => {
			if (socket) {
				socket.off("connect");
				socket.off("disconnect");
				socket.off("pong");
				socket.off("allSignIn");
				socket.off("newSignIn");
				socket.off("clientDisconnected");
			}
		};
	}, [socket]);

	const sendPing = () => {
		if (socket) {
			socket.emit("ping", "Hello from Next.js!");
		}
	};

	const [signInCount, setSignInCount] = useState(0);

	const sendSignIn = () => {
		setSignInCount(signInCount + 1);
		if (socket) {
			socket.emit("signIn", signInCount);
		}
	};

	return (
		<div>
			<h1>WebSocket Test</h1>
			<p>Connected: {isConnected.toString()}</p>
			<button onClick={sendPing}>Send Ping</button>
			{lastPong && <p>Last pong: {lastPong}</p>}

			<div>
				<button onClick={() => sendSignIn()}>Send signIn</button>
			</div>
		</div>
	);
}
