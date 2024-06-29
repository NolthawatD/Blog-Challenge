import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { Logger } from "@nestjs/common";
import { Socket } from "socket.io-client";

@WebSocketGateway({ 
  namespace: '/events',
	cors: {
    origin: 'http://localhost:3000', // Replace with your Next.js app's URL
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	private readonly logger = new Logger(EventsGateway.name);

	@WebSocketServer() server: Server;

	@SubscribeMessage('ping')
  handlePing(@MessageBody() data: string, @ConnectedSocket() client: Socket): { event: string; data: string } {
    console.log(`Received ping from ${client.id}:`, data);
    return { event: 'pong', data: 'Pong from server!' };
  }

	afterInit() {
		this.logger.log("Initialized");
	}

	handleConnection(client: any, ...args: any[]) {
		const { sockets } = this.server.sockets;

		this.logger.log(`Client id: ${client.id} connected`);
		this.logger.debug(`Number of connected clients: ${sockets?.size}`);
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
