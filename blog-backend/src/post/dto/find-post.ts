import { IsInt, IsOptional, IsString, validate, validateOrReject } from "@nestjs/class-validator";
import { Min } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination";

export class FindAllPostsDto extends PaginationDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

	@IsOptional()
  @IsInt()
  authorId?: number;
}