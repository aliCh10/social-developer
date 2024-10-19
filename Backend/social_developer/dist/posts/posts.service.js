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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("./entities/post.entity");
const user_entity_1 = require("../user/entities/user.entity");
let PostsService = class PostsService {
    constructor(postRepository, userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }
    async create(createPostDto, file) {
        const { description, userId } = createPostDto;
        if (!description && !file) {
            throw new common_1.BadRequestException('Either description or image is required');
        }
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const post = new post_entity_1.Post();
        if (description) {
            post.description = description;
        }
        if (file) {
            post.imageUrl = file.filename;
        }
        if (user) {
            post.user = user;
        }
        return await this.postRepository.save(post);
    }
    async findAll() {
        return await this.postRepository.find();
    }
    async findOne(id) {
        const post = await this.postRepository.findOne({ where: { id } });
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        return post;
    }
    async update(id, updatePostDto, file) {
        const post = await this.findOne(id);
        const { description } = updatePostDto;
        if (!description && !file && !post.description && !post.imageUrl) {
            throw new common_1.BadRequestException('Post must contain either a description or an image');
        }
        if (description) {
            post.description = description;
        }
        if (file) {
            post.imageUrl = file.filename;
        }
        return await this.postRepository.save(post);
    }
    async remove(id) {
        const post = await this.findOne(id);
        await this.postRepository.remove(post);
    }
    async getPostsByUserId(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const posts = await this.postRepository.find({
            where: { user: { id: userId } },
            relations: ['user'],
        });
        return posts;
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PostsService);
//# sourceMappingURL=posts.service.js.map