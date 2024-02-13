import { Controller, Get, Param } from '@nestjs/common';
import { PostComment as PostCommentModel } from '@prisma/client';
import { PostCommentService } from './post.comment.service';

@Controller('post-comment')
export class PostCommentController {
  constructor(private readonly postCommentService: PostCommentService) {}

  @Get(':id')
  async getPostCommentById(
    @Param('id') id: string,
  ): Promise<PostCommentModel | null> {
    return this.postCommentService.postComment({ id });
  }
}
