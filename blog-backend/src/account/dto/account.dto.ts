import { IsString } from "@nestjs/class-validator";

export class CreateAccountDto {
	@IsString()
	username: string;
}
