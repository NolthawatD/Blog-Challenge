import { IsArray, IsInt, IsOptional, IsString, validate, validateOrReject } from "@nestjs/class-validator";
import { PaginationDto } from "src/common/dto/pagination";

export class FindAllPostsDto extends PaginationDto {
  @IsOptional()
  title?: string | null;

  @IsOptional()
  content?: string;

	@IsOptional()
  authorId?: number;

  @IsOptional()
  communityId?: string;
}