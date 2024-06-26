import { AccountService } from "./account.service";
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Res, HttpStatus } from "@nestjs/common";
import { CreateAccountDto } from "./dto/account.dto";
import { Response } from 'express';

@Controller("account")
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@Post()
	async sigIn(
		@Body() createTestDto: CreateAccountDto, 
		@Res({ passthrough: true }) res: Response,
	){
		const response = await this.accountService.sigIn(createTestDto);
		res.status(response.status).json(response);
	}
}
