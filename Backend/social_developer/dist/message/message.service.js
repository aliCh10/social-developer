"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const message_entity_1 = require("./entities/message.entity");
const conversation_entity_1 = require("../conversation/entities/conversation.entity");
const user_entity_1 = require("../user/entities/user.entity");
let MessageService = class MessageService {
    constructor(messageRepository, conversationRepository, userRepository) {
        this.messageRepository = messageRepository;
        this.conversationRepository = conversationRepository;
        this.userRepository = userRepository;
    }
    async sendMessage(senderId, receiverId, content, conversationId) {
        const sender = await this.userRepository.findOne({ where: { id: senderId } });
        const receiver = await this.userRepository.findOne({ where: { id: receiverId } });
        const conversation = await this.conversationRepository.findOne({ where: { id: conversationId }, relations: ['messages'] });
        if (!sender || !receiver)
            throw new common_1.NotFoundException('User not found');
        if (!conversation)
            throw new common_1.NotFoundException('Conversation not found');
        const message = this.messageRepository.create({ sender, receiver, content, conversation });
        return await this.messageRepository.save(message);
    }
    async getMessages(conversationId) {
        const conversation = await this.conversationRepository.findOne({ where: { id: conversationId }, relations: ['messages'] });
        if (!conversation)
            throw new common_1.NotFoundException('Conversation not found');
        return conversation.messages;
    }
    async createMessage(senderId, receiverId, content) {
        const sender = await this.userRepository.findOne({ where: { id: senderId } });
        const receiver = await this.userRepository.findOne({ where: { id: receiverId } });
        if (!sender || !receiver)
            throw new common_1.NotFoundException('User(s) not found');
        const message = this.messageRepository.create({
            sender,
            receiver,
            content,
        });
        return this.messageRepository.save(message);
    }
    async getUserMessages(userId) {
        const messages = await this.messageRepository.find({
            where: [
                { sender: { id: userId } },
                { receiver: { id: userId } },
            ],
            relations: ['sender', 'receiver', 'conversation'],
        });
        if (messages.length === 0) {
            throw new common_1.NotFoundException('No messages found for this user');
        }
        return messages;
    }
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __param(1, (0, typeorm_1.InjectRepository)(conversation_entity_1.Conversation)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MessageService);
//# sourceMappingURL=message.service.js.map