import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Response } from "express";

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.commentService.create(createCommentDto);
		res.status(result.status).json(result);
  }
}
