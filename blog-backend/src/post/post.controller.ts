import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { Response } from "express";
import { FindAllPostsDto } from "./dto/find-post";

@Controller("post")
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Post()
	async create(@Body() createPostDto: CreatePostDto, @Res({ passthrough: true }) res: Response) {
		const result = await this.postService.create(createPostDto);
		res.status(result.status).json(result);
	}

	@Get()
	async findAll(@Query() query: FindAllPostsDto, @Res({ passthrough: true }) res: Response) {
		const result = await this.postService.findAll(query);
		res.status(result.status).json(result);
	}

	@Get(":id")
	async findOne(@Param("id") id: number, @Res({ passthrough: true }) res: Response) {
		const result = await this.postService.findOne(id);
		res.status(result.status).json(result);
	}

	@Patch(":id")
	async update(@Param("id") id: number, @Body() updatePostDto: UpdatePostDto, @Res({ passthrough: true }) res: Response) {
		const result = await this.postService.update(id, updatePostDto);
		res.status(result.status).json(result);
	}

	@Delete(":id")
	async remove(@Param("id") id: string, @Res({ passthrough: true }) res: Response) {
		const result = await this.postService.remove(+id);
		res.status(result.status).json(result);
	}
}
