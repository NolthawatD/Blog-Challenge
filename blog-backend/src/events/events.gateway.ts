import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { Logger } from "@nestjs/common";
import { Socket } from "socket.io-client";

interface SignInEvent {
	clientId: string;
	signInId: string;
	timestamp: Date;
}
@WebSocketGateway({
	namespace: "/events",
	cors: {
		origin: "*",
	},
})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	private readonly logger = new Logger(EventsGateway.name);
	private signInEvents: SignInEvent[] = [];

	@WebSocketServer() server: Server;

	afterInit() {
		this.logger.log("Initialized");
	}

	handleConnection(client: Socket, ...args: any[]) {
		const { sockets } = this.server.sockets;
		this.logger.log(`Client id: ${client.id} connected`);
		// console.log(`signInEvents, ${JSON.stringify(this.signInEvents)}`);

		this.sendExistingEvents(client);
	}

	handleDisconnect(client: any) {
		this.logger.log(`Cliend id: ${client.id} disconnected`);

		// User disconnected
		const disconnectSign = this.signInEvents.filter((event) => event.clientId == client.id);
		this.server.emit("disconnectSignIn", disconnectSign[0]);

		// Remove user disconnected
		this.signInEvents = this.signInEvents.filter((event) => event.clientId !== client.id);
	}

	@SubscribeMessage("ping")
	handleEvent(@MessageBody() data: string, @ConnectedSocket() client: Socket): { event: string; data: string } {
		this.logger.log(`Message received from client id: ${client.id}`);
		this.logger.debug(`Payload: ${data}`);
		return {
			event: "pong",
			data,
		};
	}

	@SubscribeMessage("signIn")
	handleSignIn(@MessageBody() signInId: string, @ConnectedSocket() client: Socket): { event: string; signInId: string } {
		this.logger.log(`Event: signIn`);
		this.logger.log(`Message received from client id: ${client.id}`);
		this.logger.debug(`Payload: ${signInId}`);

		const newSignIn: SignInEvent = {
			clientId: client.id,
			signInId: signInId,
			timestamp: new Date(),
		};

		const findExistSingIn = this.signInEvents.findIndex((s) => s.clientId === newSignIn.clientId);
		if (findExistSingIn > 0){
			return
		}

		this.signInEvents.push(newSignIn);
		this.server.emit("newSignIn", newSignIn);

		return {
			event: "signIn",
			signInId,
		};
	}

	sendExistingEvents(client: Socket) {
		client.emit("allSignIn", this.signInEvents);
	}
}
