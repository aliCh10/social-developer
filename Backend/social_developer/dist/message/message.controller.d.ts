import { MessageService } from './message.service';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    getUserMessages(userId: number): Promise<import("./entities/message.entity").Message[]>;
}
