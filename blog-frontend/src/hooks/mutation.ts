import { backendAPI } from "./apiConfig";

export const mutationData = async (routeName: string, payload: {}) => {
	console.log("%c === ","color:cyan","  payload", payload);
	console.log("%c === ","color:cyan","  routeName", routeName);
	const url = new URL(backendAPI + "/" + routeName);
	return await fetch(url, {
		method: "POST",
		headers: {
      'Content-Type': 'application/json'
    },
		body: JSON.stringify(payload),
	}).then((res) => res.json());
};
