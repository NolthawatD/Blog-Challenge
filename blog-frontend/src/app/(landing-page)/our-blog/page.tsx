"use client";

import ContentBlog from "@/components/contentBlog";
import ModalEdit from "@/components/modalEdit";
import ModalRemove from "@/components/modalRemove";
import SearchBar from "@/components/searchBar";
import { fetchData } from "@/hooks/fetch";
import { mutationData } from "@/hooks/mutation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query";

export default function OurBlog() {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [dropdownOpenModal, setDropdownOpenModal] = useState(false);
	const [selectedCommunity, setSelectedCommunity] = useState<string>("");
	const [toggleModalRemove, setToggleModalRemove] = useState<boolean>(false);
	const [toggleModalEdit, setToggleModalEdit] = useState<boolean>(false);

	const handleToggleRemove = () => setToggleModalRemove(!toggleModalRemove);
	const handleToggleEdit = () => setToggleModalEdit(!toggleModalEdit);

	const toggleDropdownModal = () => setDropdownOpenModal(!dropdownOpen);
	const handleCommunitySelect = (community: string) => {
		setSelectedCommunity(community);
		setDropdownOpenModal(false);
	};

	const [blogs, setBlogs] = useState<any[]>([]);
	const [communities, setCommunities] = useState([]);

	return (
		<div>
			<SearchBar setBlogs={setBlogs} />
			<ContentBlog blogs={blogs} handleToggleRemove={handleToggleRemove} handleToggleEdit={handleToggleEdit} />

			{toggleModalEdit && <ModalEdit handleToggleEdit={handleToggleEdit} />}

			{toggleModalRemove && <ModalRemove handleToggleRemove={handleToggleRemove} />}
		</div>
	);
}
