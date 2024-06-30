"use client"

import { useQuery } from "react-query";
import { backendAPI } from "./apiConfig";

interface SignInBody {
  username: string;
}

const signIn = async (username: string) => {
  const url = `${backendAPI}/account/signIn`;
  const body: SignInBody = { username };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export function useSignIn(username: string) {
  return useQuery(["signIn", username], () => signIn(username), {
    enabled: false,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}