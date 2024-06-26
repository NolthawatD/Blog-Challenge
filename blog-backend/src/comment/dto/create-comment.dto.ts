import { IsInt, IsString, validate, validateOrReject } from "@nestjs/class-validator";

export class CreateCommentDto {
	@IsString()
	comment: string;

	@IsInt()
	postId: number;

	@IsInt()
	commenterId: number;
}