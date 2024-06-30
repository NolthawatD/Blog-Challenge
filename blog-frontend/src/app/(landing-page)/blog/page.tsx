"use client";

import ContentBlog from "@/components/contentBlog";
import SearchBar from "@/components/searchBar";
import { useState } from "react";

const handleToggleRemove = (blogId: number | undefined) => {
	console.log("Remove blogId", blogId);
};
const handleToggleEdit = (blogId: number | undefined) => {
	console.log("Edit blogId", blogId);
};

export default function Home() {
	const [blogs, setBlogs] = useState<any[]>([]);

	return (
		<div>
			<SearchBar setBlogs={setBlogs} />
			<ContentBlog blogs={blogs} handleToggleRemove={handleToggleRemove} handleToggleEdit={handleToggleEdit} />
		</div>
	);
}
