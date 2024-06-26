import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      // console.log('Prisma Client is connected to the database.');
      await this.$connect();
    } catch (error) {
      console.error('Failed to connect to the database:', error);
      await this.$disconnect();
    } finally {
	  await this.$disconnect();
	}
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      console.log('Prisma Client is about to close.');
      await this.$disconnect();
    });

    process.on('SIGTERM', async () => {
      console.log('Received SIGTERM. Closing Prisma Client.');
      await this.$disconnect();
    });

    process.on('SIGINT', async () => {
      console.log('Received SIGINT. Closing Prisma Client.');
      await this.$disconnect();
    });
  }
}