import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private users;
    handleConnection(socket: Socket): void;
    handleDisconnect(socket: Socket): void;
    sendMessageToUser(userId: string, message: string): void;
}
