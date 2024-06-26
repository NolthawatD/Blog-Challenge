import { IsOptional, Min } from "@nestjs/class-validator";
import { IsInt } from "class-validator";

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;

  constructor() {
    this.page = 1;
    this.limit = 10;
  }
}