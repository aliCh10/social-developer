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
exports.LikeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const like_entity_1 = require("./entities/like.entity");
const post_entity_1 = require("../posts/entities/post.entity");
const user_entity_1 = require("../user/entities/user.entity");
let LikeService = class LikeService {
    constructor(likeRepository, postRepository, userRepository) {
        this.likeRepository = likeRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }
    async addLike(postId, userId) {
        const post = await this.postRepository.findOne({ where: { id: postId } });
        if (!post) {
            throw new common_1.NotFoundException(`Post with ID ${postId} not found`);
        }
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        const existingLike = await this.likeRepository.findOne({
            where: { post: { id: postId }, user: { id: userId } },
        });
        if (existingLike) {
            throw new Error('User has already liked this post');
        }
        const like = this.likeRepository.create({
            post,
            user,
        });
        return this.likeRepository.save(like);
    }
    async removeLike(postId, userId) {
        const like = await this.likeRepository.findOne({
            where: { post: { id: postId }, user: { id: userId } },
        });
        if (!like) {
            throw new common_1.NotFoundException(`Like not found for this post by user ${userId}`);
        }
        await this.likeRepository.remove(like);
    }
    async getLikesCount(postId) {
        const likes = await this.likeRepository.count({
            where: { post: { id: postId } },
        });
        return likes;
    }
    async getalllikes() {
        return this.likeRepository.find();
    }
};
exports.LikeService = LikeService;
exports.LikeService = LikeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(like_entity_1.Like)),
    __param(1, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LikeService);
//# sourceMappingURL=like.service.js.map