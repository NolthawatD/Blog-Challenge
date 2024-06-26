import { prisma } from "./client";

export class BaseService {
	get prismaService() {
		return prisma;
	}
}
