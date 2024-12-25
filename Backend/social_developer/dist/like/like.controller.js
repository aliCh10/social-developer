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
exports.LikeController = void 0;
const common_1 = require("@nestjs/common");
const like_service_1 = require("./like.service");
const swagger_1 = require("@nestjs/swagger");
let LikeController = class LikeController {
    constructor(likeService) {
        this.likeService = likeService;
    }
    async addLike(postId, userId) {
        return this.likeService.addLike(postId, userId);
    }
    async removeLike(postId, userId) {
        return this.likeService.removeLike(postId, userId);
    }
    async getLikesCount(postId) {
        return this.likeService.getLikesCount(postId);
    }
    async getAllLikes() {
        return this.likeService.getalllikes();
    }
};
exports.LikeController = LikeController;
__decorate([
    (0, common_1.Post)('add/:postId/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Ajouter un like à un post' }),
    (0, swagger_1.ApiParam)({ name: 'postId', description: 'ID du post à aimer', type: Number }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'ID de l\'utilisateur qui aime le post', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Like ajouté avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Mauvaise demande' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Post ou utilisateur introuvable' }),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "addLike", null);
__decorate([
    (0, common_1.Delete)('remove/:postId/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un like d\'un post' }),
    (0, swagger_1.ApiParam)({ name: 'postId', description: 'ID du post dont on veut enlever le like', type: Number }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'ID de l\'utilisateur qui a aimé le post', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Like supprimé avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Like non trouvé pour ce post et utilisateur' }),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "removeLike", null);
__decorate([
    (0, common_1.Post)('count/:postId'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir le nombre de likes d\'un post' }),
    (0, swagger_1.ApiParam)({ name: 'postId', description: 'ID du post pour lequel on veut obtenir le nombre de likes', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Nombre de likes retourné' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Post non trouvé' }),
    __param(0, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "getLikesCount", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir tous les likes' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tous les likes retournés' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "getAllLikes", null);
exports.LikeController = LikeController = __decorate([
    (0, swagger_1.ApiTags)('likes'),
    (0, common_1.Controller)('likes'),
    __metadata("design:paramtypes", [like_service_1.LikeService])
], LikeController);
//# sourceMappingURL=like.controller.js.map