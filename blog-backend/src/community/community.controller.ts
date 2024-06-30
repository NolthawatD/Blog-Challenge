import { Controller, Get, Res } from '@nestjs/common';
import { CommunityService } from './community.service';
import { Response } from "express";

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

	@Get()
	async findAll( @Res({ passthrough: true }) res: Response) {
		const result = await this.communityService.findAll();
		res.status(result.status).json(result);
	}
}
