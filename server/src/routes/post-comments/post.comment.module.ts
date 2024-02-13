import { Module } from '@nestjs/common';
import { PostCommentService } from './post.comment.service';
import { PostCommentController } from './post.comment.controller';

@Module({
  controllers: [PostCommentController],
  providers: [PostCommentService],
  exports: [PostCommentService],
})
export class PostCommentModule {}
