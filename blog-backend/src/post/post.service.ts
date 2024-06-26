import { BadRequestException, Global, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { sendError, sendResponse } from "src/utils/send-response";
import { BaseService } from "src/prisma/base.service";
import { AccountService } from "src/account/account.service";
import { GlobalService } from "src/global/global.service";
import { FindAllPostsDto } from "./dto/find-post";
import { pagination } from "prisma-extension-pagination";
import { removeUndefinedValues } from "src/utils/utils";

@Injectable()
export class PostService extends BaseService {
	constructor(private readonly globalService: GlobalService) {
		super();
	}

	public async create(data: CreatePostDto) {
		console.log("Service: create post");
		try {
			if (!data.title) throw new BadRequestException("title's required");
			if (!data.content) throw new BadRequestException("content's required");
			if (!data.authorId) throw new BadRequestException("authorId's required");
			const existAccount = await this.globalService.doesExistAccount(null, data.authorId);
			if (!existAccount) throw new UnauthorizedException("Please sign in again");

			const savePost = await this.prismaService.post.create({
				data: {
					title: data.title,
					content: data.content,
					author_id: data.authorId,
					community_id: data.communityId,
				},
			});
			return sendResponse(savePost, HttpStatus.OK);
		} catch (error) {
			return sendError(error.status, error.message ? error.message : "Something went wrong.");
		}
	}

	async findAll(query: FindAllPostsDto) {
		console.log("Service: find all post");
		const whereCause = {
			title: {
				contains: query?.title ?? undefined,
				mode: "insensitive",
			},
			content: {
				contains: query?.content ?? undefined,
				mode: "insensitive",
			},
			author_id: query?.authorId > 0 ? query?.authorId : undefined,
			is_deleted: false,
		};

		try {
			const [response, meta] = await this.prismaService
				.$extends(
					pagination({
						pages: { limit: Number(query?.limit), includePageCount: true },
					})
				)
				.post.paginate({
					where: removeUndefinedValues(whereCause),
					orderBy: {
						created_at: "desc",
					},
					include: {
						author: true,
						comments: true,
						community: true,
					},
				})
				.withPages({
					limit: Number(query?.limit ?? 10),
					page: Number(query?.page ?? 1),
				});

			const result = {
				currentPage: meta.currentPage,
				pages: meta.pageCount,
				currentCount: response.length,
				totalCount: meta.totalCount,
				result: response,
			};

			return sendResponse(result, HttpStatus.OK);
		} catch (error) {
			return sendError(error.status, error.message ? error.message : "Something went wrong.");
		}
	}

	async update(id: number, data: UpdatePostDto) {
		try {
			const updatePost = await this.prismaService.post.update({
				where: {
					id,
				},
				data: {
					title: data.title,
					content: data.content,
				},
			});
			return sendResponse(updatePost, HttpStatus.OK);
		} catch (error) {
			return sendError(error.status, error.message ? error.message : "Something went wrong.");
		}
	}

	async remove(id: number) {
		try {
			const updatePost = await this.prismaService.post.update({
				where: {
					id,
				},
				data: {
					is_deleted: true,
				}
			});

			const result = { message: "Post's deleted complete" , is_deleted: true}
			if (!updatePost) {
				result.message = "Post's deleted incomplete"
				result.is_deleted = false
			}
			return sendResponse(result, HttpStatus.OK);
			
		} catch (error) {
			return sendError(error.status, error.message ? error.message : "Something went wrong.");
		}
	}
}
