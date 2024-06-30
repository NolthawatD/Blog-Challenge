"use client";

import Image from "next/image";

// const NotificationMiniDisplay = ({
//   isClient = false as boolean,
//   notiDatas = [] as any[],
//   handleScrollWhenBottomIsMax = (
//     e: UIEvent | HTMLElement | Event | any
//   ): void => {},
//   updateIsReaded = async (index: number, id: number): Promise<any> => {},
//   showLoading = false as boolean,
// }) => {

export default function ContentBlog({ blogs = [] as any[] }) {
	return (
		<div>
			{/* Content */}
			<div className="md:px-0 px-4">
				<div className="pl-0 py-5 md:pr-60">
					<div className="bg-white rounded-lg shadow-md border-b-2">
						{blogs?.map((blog: any) => (
							<div className="container mx-auto" key={blog?.id + Math.random()}>
								<div className="flex flex-row flex-wrap py-4">
									<aside className="w-full px-2 ">
										<div className="sticky top-0 p-4 w-fullrounded-lg">
											<div className="flex items-center mb-4">
												<Image
													className="rounded-full w-10 h-10 me-3"
													width={50}
													height={50}
													alt="icon"
													src="/assets/image/default.png"
												/>
												<p className="text-header">{blog?.author?.username}</p>
											</div>
											<div className="py-1 px-4 bg-gray-300	rounded-full w-max">
												<span className="text-slate-700	">{blog?.community?.name}</span>
											</div>
											<h2 className="text-3xl	font-medium	mt-3">{blog?.title}</h2>
											<ul className="flex flex-col overflow-hidden rounded-lg">{blog?.content?.slice(0, 500) + "..."}</ul>
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
