import { BadRequestException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { GlobalService } from 'src/global/global.service';
import { BaseService } from 'src/prisma/base.service';
import { sendError, sendResponse } from 'src/utils/send-response';

@Injectable()
export class CommentService extends BaseService {
	constructor(private readonly globalService: GlobalService) {
		super()
	}

  async create(data: CreateCommentDto) {
    console.log("Service: create comment");
		try {
			if (!data.comment) throw new BadRequestException("comment's required");
			if (!data.commenterId) throw new BadRequestException("commenterId's required");
			const existAccount = await this.globalService.doesExistAccount(null, data.commenterId);
			if (!existAccount) throw new UnauthorizedException("Please sign in again");

			const savePost = await this.prismaService.comment.create({
				data: {
					comment: data.comment,
					commenter_id: data.commenterId,
					post_id: data.postId,
				},
			});
			return sendResponse(savePost, HttpStatus.OK);
		} catch (error) {
			return sendError(error.status, error.message ? error.message : "Something went wrong.");
		}
  }
}
