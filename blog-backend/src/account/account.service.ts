import { BadRequestException, HttpCode, HttpStatus, Injectable } from "@nestjs/common";
import { BaseService } from "src/prisma/base.service";
import { CreateAccountDto } from "./dto/account.dto";
import { sendError, sendResponse } from "src/utils/send-response";
import { Account } from "@prisma/client";
import { GlobalService } from "src/global/global.service";

@Injectable()
export class AccountService extends BaseService {
	constructor(private readonly globalService: GlobalService) {
		super();
	}

	async sigIn(data: CreateAccountDto) {
		console.log("Service: sign in");
		try {
			if (!data.username) {
				throw new BadRequestException("Username's required");
			}

			const doesExistAccount = await this.globalService.doesExistAccount(data.username);
			if (doesExistAccount) {
				console.log(": existing account");
				return sendResponse(doesExistAccount, HttpStatus.OK);
			} else {
				console.log(": new account");
				const saveAccount = await this.prismaService.account.create({
					data: {
						username: data.username,
					},
				});
				return sendResponse(saveAccount, HttpStatus.OK);
			}
		} catch (error) {
			return sendError(error.status, error.message ? error.message : "Something went wrong.");
		}
	}
}
