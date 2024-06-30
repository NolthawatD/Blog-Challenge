import { backendAPI } from "./apiConfig";

export const fetchData = async (routeName: string, queryParams: any = {}) => {
	const url = new URL(backendAPI + "/" + routeName);
	const params = new URLSearchParams(queryParams);


	url.search = params.toString();

	// console.log("%c === ","color:cyan","queryParams", queryParams);
	// console.log(`HOOK: fetchData url: ${url}`);

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
