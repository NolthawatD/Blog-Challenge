import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { GlobalService } from 'src/global/global.service';

@Module({
  controllers: [PostController],
  providers: [PostService, GlobalService],
})
export class PostModule {}
