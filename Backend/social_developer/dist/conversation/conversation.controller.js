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
exports.ConversationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const conversation_service_1 = require("./conversation.service");
const create_conversation_dto_1 = require("./dto/create-conversation.dto");
const message_entity_1 = require("../message/entities/message.entity");
let ConversationController = class ConversationController {
    constructor(conversationService) {
        this.conversationService = conversationService;
    }
    createConversation(createConversationDto) {
        return this.conversationService.createConversation(createConversationDto);
    }
    sendMessage(conversationId, body) {
        return this.conversationService.sendMessage(conversationId, body.senderId, body.content);
    }
    isUserOnline(userId) {
        return this.conversationService.isUserOnline(userId);
    }
    async getConversationsByUser(userId) {
        return this.conversationService.getConversationsByUser(userId);
    }
    async getMessagesByConversation(conversationId) {
        return this.conversationService.getMessagesByConversation(conversationId);
    }
    async deleteConversation(conversationId) {
        return this.conversationService.deleteConversation(conversationId);
    }
};
exports.ConversationController = ConversationController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new conversation' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The conversation has been created successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'One or both users not found.' }),
    (0, swagger_1.ApiBody)({ type: create_conversation_dto_1.CreateConversationDto, description: 'User IDs for creating a conversation' }),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_conversation_dto_1.CreateConversationDto]),
    __metadata("design:returntype", void 0)
], ConversationController.prototype, "createConversation", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Send a message in a conversation' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The message has been sent successfully.', type: message_entity_1.Message }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Conversation not found.' }),
    (0, swagger_1.ApiParam)({ name: 'conversationId', description: 'ID of the conversation' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                senderId: { type: 'number', description: 'ID of the sender' },
                content: { type: 'string', description: 'Message content' },
            },
        },
    }),
    (0, common_1.Post)(':conversationId/messages'),
    __param(0, (0, common_1.Param)('conversationId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "sendMessage", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Check if a user is online' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The online status of the user.', type: Boolean }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found.' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'ID of the user' }),
    (0, common_1.Get)('online/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "isUserOnline", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all conversations of a user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of conversations for the user' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "getConversationsByUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all messages of a conversation' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of messages in the conversation' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Conversation not found' }),
    (0, swagger_1.ApiParam)({ name: 'conversationId', type: Number }),
    (0, common_1.Get)(':conversationId/messages'),
    __param(0, (0, common_1.Param)('conversationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "getMessagesByConversation", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a conversation' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'The conversation has been deleted successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Conversation not found.' }),
    (0, swagger_1.ApiParam)({ name: 'conversationId', type: Number }),
    (0, common_1.Delete)(':conversationId'),
    __param(0, (0, common_1.Param)('conversationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "deleteConversation", null);
exports.ConversationController = ConversationController = __decorate([
    (0, swagger_1.ApiTags)('conversations'),
    (0, common_1.Controller)('conversations'),
    __metadata("design:paramtypes", [conversation_service_1.ConversationService])
], ConversationController);
//# sourceMappingURL=conversation.controller.js.map