import { WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';

@Injectable()
@WebSocketGateway() // Use WebSocketGateway instead of Gateway
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private users = new Map<string, Socket>();

  handleConnection(socket: Socket) {
    console.log(`User connected: ${socket.id}`);
    this.users.set(socket.id, socket);
  }

  handleDisconnect(socket: Socket) {
    console.log(`User disconnected: ${socket.id}`);
    this.users.delete(socket.id);
  }

  sendMessageToUser(userId: string, message: string) {
    const socket = this.users.get(userId);
    if (socket) {
      socket.emit('message', message);
    }
  }
}
