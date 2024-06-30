import { backendAPI } from "./apiConfig";

export const fetchData = async (query: string) => {
	const url = `${backendAPI}/${query}`;
	console.log(`HOOK: useFectData url: ${url}`);
	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json();
};
