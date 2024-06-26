import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { GlobalService } from 'src/global/global.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService, GlobalService],
})
export class AccountModule {}
