import { IsInt, IsString, validate, validateOrReject } from "@nestjs/class-validator";

export class CreateCommentDto {
	@IsInt()
	postId: number;

	@IsString()
	comment: string;

	@IsInt()
	commenterId: number;
}