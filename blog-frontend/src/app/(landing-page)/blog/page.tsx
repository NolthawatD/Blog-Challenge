"use client";

import ContentBlog from "@/components/content";
import SearchBar from "@/components/searchBar";
import { useState } from "react";

export default function Home() {
	const [blogs, setBlogs] = useState<any[]>([]);

	return (
		<div>
			<SearchBar setBlogs={setBlogs} />
			<ContentBlog blogs={blogs} />
		</div>
	);
}
