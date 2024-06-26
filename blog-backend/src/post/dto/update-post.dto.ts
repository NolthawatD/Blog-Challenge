import { PartialType } from "@nestjs/mapped-types";
import { CreatePostDto } from "./create-post.dto";
import { IsInt } from "@nestjs/class-validator";

export class UpdatePostDto extends PartialType(CreatePostDto) {}
