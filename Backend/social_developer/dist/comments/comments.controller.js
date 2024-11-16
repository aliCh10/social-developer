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
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const update_comment_dto_1 = require("./dto/update-comment.dto");
const comment_entity_1 = require("./entities/comment.entity");
const comments_service_1 = require("./comments.service");
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    async create(createCommentDto, postId, userId) {
        return this.commentService.create(createCommentDto, postId, userId);
    }
    async findAll(postId) {
        return this.commentService.findAll(postId);
    }
    async findOne(id) {
        return this.commentService.findOne(id);
    }
    async update(id, updateCommentDto) {
        return this.commentService.update(id, updateCommentDto);
    }
    async remove(id) {
        return this.commentService.remove(id);
    }
};
exports.CommentController = CommentController;
__decorate([
    (0, common_1.Post)(':postId/user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un commentaire pour un post' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Commentaire créé', type: comment_entity_1.Comment }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Données invalides' }),
    (0, swagger_1.ApiParam)({ name: 'postId', description: 'ID du post', type: Number }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'ID de l\'utilisateur', type: Number }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('postId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_dto_1.CreateCommentDto, Number, Number]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('post/:postId'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer les commentaires d\'un post' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des commentaires', type: [comment_entity_1.Comment] }),
    (0, swagger_1.ApiParam)({ name: 'postId', description: 'ID du post', type: Number }),
    __param(0, (0, common_1.Param)('postId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer un commentaire par son ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Commentaire trouvé', type: comment_entity_1.Comment }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Commentaire non trouvé' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID du commentaire', type: Number }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour un commentaire' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Commentaire mis à jour', type: comment_entity_1.Comment }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Commentaire non trouvé' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID du commentaire à mettre à jour', type: Number }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_comment_dto_1.UpdateCommentDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un commentaire' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Commentaire supprimé' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Commentaire non trouvé' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID du commentaire à supprimer', type: Number }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "remove", null);
exports.CommentController = CommentController = __decorate([
    (0, swagger_1.ApiTags)('Comments'),
    (0, common_1.Controller)('comments'),
    __metadata("design:paramtypes", [comments_service_1.CommentService])
], CommentController);
//# sourceMappingURL=comments.controller.js.map