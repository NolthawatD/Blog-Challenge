"use client";

import ContentBlog from "@/components/content";
import SearchBar from "@/components/searchBar";
import { fetchData } from "@/hooks/fetch";
import { mutationData } from "@/hooks/mutation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query";

export default function Home() {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [isSearchFocused, setIsSearchFocused] = useState(false);

	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen);
	};

	const handleSearchFocus = () => {
		setIsSearchFocused(true);
	};

	const handleSearchBlur = () => {
		setIsSearchFocused(false);
	};

	const [dropdownOpenModal, setDropdownOpenModal] = useState(false);

	const toggleDropdownModal = () => setDropdownOpenModal(!dropdownOpen);

	const [blogs, setBlogs] = useState([]);
	const [communities, setCommunities] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [communitySelect, setCommunitySelect] = useState<number[]>([]);

	const [toggleModalCreate, setToggleModalCreate] = useState(false);
	const [communityIdCreate, setCommunityIdCreate] = useState<number>(0);
	const [communityNameCreate, setCommunityNameCreate] = useState<string>("");
	const [newTitle, setNewTitle] = useState("");
	const [newContent, setNewContent] = useState("");
	const [authorId, setAuthorId] = useState(0);
	const queryClient = useQueryClient();

	const mutation = useMutation(
		async () => await mutationData("post", { title: newTitle, content: newContent, authorId: authorId, communityId: communityIdCreate }),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("post");
				blogRefetch();
			},
		}
	);

	const handleCommunityCreate = (communityId: number, communityName: string) => {
		setCommunityIdCreate(communityId);
		setCommunityNameCreate(communityName);
		setDropdownOpenModal(false);
	};

	const handleToggleModalCreate = () => {
		setToggleModalCreate(!toggleModalCreate);
		if (toggleModalCreate === false) {
			setCommunityIdCreate(0);
			setCommunityNameCreate("");
			setNewTitle("");
			setNewContent("");
		}
	};

	useEffect(() => {
		const _authorId = localStorage.getItem("userId");
		setAuthorId(Number(_authorId));
	}, []);

	const handleCreateNewPost = () => {
		if (!communityNameCreate) {
			alert("Please choose community");
			return;
		}
		if (!newTitle) {
			alert("Please enter title");
			return;
		}
		if (!newContent) {
			alert("Plese enter content");
			return;
		}
		if (!authorId) {
			alert("Please sign in before");
			return;
		}

		mutation.mutate();

		handleToggleModalCreate();
	};

	const handleCommunityQuery = (comId: number) => {
		setCommunitySelect((prevCommunitySelect) => {
			if (prevCommunitySelect.includes(comId)) {
				return prevCommunitySelect.filter((id) => id !== comId);
			} else {
				return [...prevCommunitySelect, comId];
			}
		});
	};

	const {
		data: communityData,
		isLoading: communityIsLoading,
		error: communityError,
	} = useQuery("communities", () => fetchData("community"), {
		onSuccess: (data) => {
			setCommunities(data.datas);
		},
	});

	const {
		data: blogData,
		isLoading: blogIsLoading,
		error: blogError,
		refetch: blogRefetch,
	} = useQuery(
		"blogs",
		() =>
			fetchData("post", {
				authorId: "",
				title: searchInput,
				content: "",
				communityId: JSON.stringify(communitySelect),
				page: 1,
				limit: 10,
			}),
		{
			onSuccess: (data) => {
				console.log("%c === ", "color:cyan", "  data", data?.data?.result);
				setBlogs(data?.data?.result);
			},
		}
	);

	useEffect(() => {
		if (!communityIsLoading && !blogIsLoading) {
			console.log("Both queries are complete");
		}
	}, [communityIsLoading, blogIsLoading]);

	useEffect(() => {
		blogRefetch();
	}, [searchInput, communitySelect]);

	return (
		<div>
			<SearchBar />
			<ContentBlog blogs={blogs} />
		</div>
	);
}
