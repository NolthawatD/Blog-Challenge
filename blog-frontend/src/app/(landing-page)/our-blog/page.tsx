"use client";

import ContentBlog from "@/components/contentBlog";
import ModalEdit from "@/components/modalEdit";
import ModalRemove from "@/components/modalRemove";
import SearchBar from "@/components/searchBar";
import { useState } from "react";

export default function OurBlog() {
	const [blogs, setBlogs] = useState<any[]>([]);
	const [blogRemoveId, setBlogRemoveId] = useState<number | undefined>();
	const [blogEdit, setBlogEdit] = useState<any>()
	const [toggleModalRemove, setToggleModalRemove] = useState<boolean>(false);
	const [toggleModalEdit, setToggleModalEdit] = useState<boolean>(false);

	const handleToggleRemove = (blogRemoveId: number | undefined) => {
		setToggleModalRemove(!toggleModalRemove);
		setBlogRemoveId(blogRemoveId);
		setBlogEdit
	};
	const handleToggleEdit = (blogEdit: number| undefined) => {
		setToggleModalEdit(!toggleModalEdit);
		setBlogEdit(blogEdit)
	};

	return (
		<div>
			<SearchBar setBlogs={setBlogs} />
			<ContentBlog 
				blogs={blogs} 
				handleToggleRemove={handleToggleRemove} 
				handleToggleEdit={handleToggleEdit} 
			/>
			{toggleModalEdit && 
				<ModalEdit handleToggleEdit={handleToggleEdit} blogEdit={blogEdit}/>
			}
			{toggleModalRemove && 
				<ModalRemove handleToggleRemove={handleToggleRemove} blogRemoveId={blogRemoveId}/>
			}
		</div>
	);
}
