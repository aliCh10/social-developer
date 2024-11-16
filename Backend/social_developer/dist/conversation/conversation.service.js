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
exports.ConversationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const conversation_entity_1 = require("./entities/conversation.entity");
const user_entity_1 = require("../user/entities/user.entity");
const message_entity_1 = require("../message/entities/message.entity");
let ConversationService = class ConversationService {
    constructor(conversationRepository, userRepository, messageRepository) {
        this.conversationRepository = conversationRepository;
        this.userRepository = userRepository;
        this.messageRepository = messageRepository;
    }
    async createConversation(createConversationDto) {
        const { userId1, userId2 } = createConversationDto;
        const user1 = await this.userRepository.findOne({ where: { id: userId1 } });
        const user2 = await this.userRepository.findOne({ where: { id: userId2 } });
        if (!user1 || !user2) {
            throw new Error('One or both users not found');
        }
        const conversation = this.conversationRepository.create({
            user1,
            user2,
        });
        return this.conversationRepository.save(conversation);
    }
    async sendMessage(conversationId, senderId, content) {
        const conversation = await this.conversationRepository.findOne({
            where: { id: conversationId },
            relations: ['user1', 'user2'],
        });
        if (!conversation) {
            throw new common_1.NotFoundException(`Conversation avec l'ID ${conversationId} introuvable.`);
        }
        const message = this.messageRepository.create({
            sender: { id: senderId },
            content,
            timestamp: new Date(),
            conversation,
        });
        return await this.messageRepository.save(message);
    }
    async isUserOnline(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException(`Utilisateur avec l'ID ${userId} introuvable.`);
        }
        return user.isOnline;
    }
    async getConversationsByUser(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }
        const conversations = await this.conversationRepository.find({
            where: [
                { user1: user },
                { user2: user }
            ],
            relations: ['user1', 'user2'],
        });
        return conversations;
    }
    async getMessagesByConversation(conversationId) {
        const conversation = await this.conversationRepository.findOne({
            where: { id: conversationId },
            relations: ['messages'],
        });
        if (!conversation) {
            throw new Error('Conversation not found');
        }
        return conversation.messages;
    }
    async deleteConversation(conversationId) {
        const conversation = await this.conversationRepository.findOne({ where: { id: conversationId } });
        if (!conversation) {
            throw new common_1.NotFoundException(`Conversation avec l'ID ${conversationId} introuvable.`);
        }
        await this.conversationRepository.remove(conversation);
    }
};
exports.ConversationService = ConversationService;
exports.ConversationService = ConversationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(conversation_entity_1.Conversation)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ConversationService);
//# sourceMappingURL=conversation.service.js.map