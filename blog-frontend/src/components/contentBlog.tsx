"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface ContentBlogProps {
	blogs: any[];
	handleToggleRemove: (blogId: number | undefined) => void;
	handleToggleEdit: (blogId: number | undefined) => void;
	setToggleModalRemove?: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function ContentBlog({ blogs, handleToggleRemove, handleToggleEdit }: ContentBlogProps) {
	const pathName = usePathname();
	const router = useRouter();

	const handleShowDetail = (blogId: number) => {
		router.push(`/blog/${blogId}`);
	};

	return (
		<div>
			{/* Content */}
			<div className="md:px-0 px-4">
				<div className="pl-0 py-5 md:pr-60">
					<div className="bg-white rounded-lg shadow-md">
						{blogs?.map((blog: any) => (
							<div className="container mx-auto hover:bg-gray-50 " key={blog?.id + Math.random()}>
								<div className="flex flex-row flex-wrap py-4">
									<aside className="w-full px-2 ">
										<div className="sticky top-0 p-4 w-fullrounded-lg">
											<div className="flex items-center mb-4 justify-between">
												<div className="flex items-center">
													<Image
														className="rounded-full w-10 h-10 mr-3"
														width={50}
														height={50}
														alt="icon"
														src="/assets/image/default.png"
													/>
													<p className="text-header">{blog?.author?.username}</p>
												</div>
												{pathName === "/our-blog" && (
													<div className="flex items-center">
														<Image
															className="hover:cursor-pointer mr-3"
															width={20}
															height={20}
															alt="icon"
															src="/assets/image/edit-pencil.svg"
															onClick={() => handleToggleEdit(blog)}
														/>
														<Image
															className="hover:cursor-pointer mr-6"
															width={20}
															height={20}
															alt="icon"
															src="/assets/image/edit-trash.svg"
															onClick={() => handleToggleRemove(blog?.id)}
														/>
													</div>
												)}
											</div>

											<div className="py-1 px-4 bg-gray-300	rounded-full w-max">
												<span className="text-slate-700	">{blog?.community?.name}</span>
											</div>
											<h2 className="text-3xl	font-medium	mt-3 hover:cursor-pointer" onClick={() => handleShowDetail(blog?.id)}>
												{blog?.title}
											</h2>
											<ul className="flex flex-col overflow-hidden rounded-lg">
												{blog?.content?.slice(0, 320)}
												{blog?.content?.length > 320 && "..."}
											</ul>
											<div className="flex items-center mt-2 ">
												<Image width={25} height={25} alt="icon" src="/assets/image/message-circle-02.svg" />
												<span className="me-2 text-span">{blog?.comments?.length}</span>
												<span className="text-span">Comments</span>
											</div>
										</div>
									</aside>
								</div>
								<hr className="h-px  bg-gray-400 border-0 dark:bg-gray-700" />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
