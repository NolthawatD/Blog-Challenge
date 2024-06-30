import { HttpStatus, Injectable } from "@nestjs/common";
import { BaseService } from "src/prisma/base.service";
import { sendResponse } from "src/utils/send-response";

@Injectable()
export class CommunityService extends BaseService {

	async findAll() {
		const response = await this.prismaService.community.findMany({
			where: {
				is_deleted: false
			}
		});
		return sendResponse(response, HttpStatus.OK);
	}

}
