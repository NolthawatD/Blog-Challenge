import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { LoggerMiddleware } from "./common/middleware/logger.midleware";
import { AccountModule } from "./account/account.module";
import { PostModule } from "./post/post.module";
import { GlobalService } from "./global/global.service";
import { CommentModule } from "./comment/comment.module";
import { EventsModule } from "./events/events.module";
import { RouterModule } from "@nestjs/core";

@Module({
	imports: [
		AccountModule,
		PostModule,
		CommentModule,
		EventsModule,
		RouterModule.register([
			{
				path: "events",
				module: EventsModule,
			},
		]),
	],
	providers: [GlobalService],
	exports: [GlobalService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).exclude({ path: "test", method: RequestMethod.POST });
	}
}
