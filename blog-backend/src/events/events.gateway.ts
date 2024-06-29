import {
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { Controller, Logger } from "@nestjs/common";

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	private readonly logger = new Logger(EventsGateway.name);

	@WebSocketServer() io: Server;

	afterInit() {
		this.logger.log("Initialized");
	}

	handleConnection(client: any, ...args: any[]) {
		const { sockets } = this.io.sockets;

		this.logger.log(`Client id: ${client.id} connected`);
		this.logger.debug(`Number of connected clients: ${sockets.size}`);
	}

	handleDisconnect(client: any) {
		this.logger.log(`Cliend id:${client.id} disconnected`);
	}

	@SubscribeMessage("ping")
	handleEvent(client: any, data: any) {
		this.logger.log(`Message received from client id: ${client.id}`);
		this.logger.debug(`Payload: ${data}`);
		return {
			event: "pong",
			data,
		};
	}
}
