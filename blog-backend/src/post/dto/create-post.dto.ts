import { IsInt, IsString, validate, validateOrReject } from "@nestjs/class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class CreatePostDto {
	@IsString()
	title: string;
	@IsString()
	content: string;
	@IsInt()
	authorId: number;
}
