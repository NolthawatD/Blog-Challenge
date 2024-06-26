import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { GlobalService } from 'src/global/global.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService, GlobalService],
})
export class CommentModule {}
