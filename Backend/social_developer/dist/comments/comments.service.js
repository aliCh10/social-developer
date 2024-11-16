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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("./entities/comment.entity");
const post_entity_1 = require("../posts/entities/post.entity");
const user_entity_1 = require("../user/entities/user.entity");
let CommentService = class CommentService {
    constructor(commentRepository, postRepository, userRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }
    async create(createCommentDto, postId, userId) {
        const post = await this.postRepository.findOne({ where: { id: postId } });
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!post || !user) {
            throw new Error('Post or User not found');
        }
        const comment = this.commentRepository.create({
            ...createCommentDto,
            post,
            user,
        });
        return await this.commentRepository.save(comment);
    }
    async findAll(postId) {
        return this.commentRepository.find({
            where: { post: { id: postId } },
            relations: ['user'],
        });
    }
    async findOne(id) {
        return this.commentRepository.findOne({
            where: { id },
            relations: ['user', 'post'],
        });
    }
    async update(id, updateCommentDto) {
        const comment = await this.commentRepository.findOne({ where: { id } });
        if (!comment) {
            throw new Error('Comment not found');
        }
        Object.assign(comment, updateCommentDto);
        return this.commentRepository.save(comment);
    }
    async remove(id) {
        const comment = await this.commentRepository.findOne({ where: { id } });
        if (!comment) {
            throw new Error('Comment not found');
        }
        await this.commentRepository.remove(comment);
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __param(1, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CommentService);
//# sourceMappingURL=comments.service.js.map