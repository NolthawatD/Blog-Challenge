import { IsInt, IsString, validate, validateOrReject } from "@nestjs/class-validator";

export class CreatePostDto {
	@IsString()
	title: string;
	@IsString()
	content: string;
	@IsInt()
	authorId: number;
	@IsInt()
	communityId: number;
}
