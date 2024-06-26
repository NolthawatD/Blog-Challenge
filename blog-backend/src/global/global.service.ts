import { Global, Injectable } from "@nestjs/common";
import { Account } from "@prisma/client";
import { BaseService } from "src/prisma/base.service";
import { sendError } from "src/utils/send-response";

@Global()
@Injectable()
export class GlobalService extends BaseService {
	async doesExistAccount(username?: string, accountId?: number): Promise<Account | null> {
		try {
			let exitingAccount: Account;
			if (username) {
				exitingAccount = await this.prismaService.account.findUnique({
					where: {
						username,
					},
				});
			}
			if (accountId) {
				exitingAccount = await this.prismaService.account.findUnique({
					where: {
						id: accountId,
					},
				});
			}
			return exitingAccount;
		} catch (error) {
			return sendError(error.status, error.message ? error.message : "Something went wrong.");
		}
	}
}
