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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../user/user.service");
const post_entity_1 = require("./entities/post.entity");
const cloudinary_1 = require("cloudinary");
const promises_1 = require("fs/promises");
const stream_1 = require("stream");
let PostService = class PostService {
    constructor(userService, postsRepository) {
        this.userService = userService;
        this.postsRepository = postsRepository;
    }
    async create(createPostDto, imageFile) {
        const user = await this.userService.findOneById(createPostDto.userId);
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${createPostDto.userId} not found`);
        }
        let imagePath = '';
        if (imageFile) {
            const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validImageTypes.includes(imageFile.mimetype)) {
                throw new common_1.BadRequestException('Invalid file type. Only .jpg, .jpeg, and .png are allowed.');
            }
            try {
                if (imageFile.path) {
                    const uploadResult = await cloudinary_1.v2.uploader.upload(imageFile.path, {
                        folder: 'posts',
                        public_id: `${Date.now()}`,
                        overwrite: true,
                    });
                    imagePath = uploadResult.secure_url;
                    await (0, promises_1.unlink)(imageFile.path);
                }
                else if (imageFile.buffer) {
                    const stream = stream_1.Readable.from(imageFile.buffer);
                    const uploadResult = await new Promise((resolve, reject) => {
                        const streamUpload = cloudinary_1.v2.uploader.upload_stream({ folder: 'posts', public_id: `${Date.now()}`, overwrite: true }, (error, result) => {
                            if (error)
                                return reject(error);
                            resolve(result);
                        });
                        stream.pipe(streamUpload);
                    });
                    imagePath = uploadResult.secure_url;
                }
            }
            catch (error) {
                console.error('Error uploading to Cloudinary:', error);
                throw new common_1.BadRequestException('Failed to upload image to Cloudinary');
            }
        }
        const post = this.postsRepository.create({
            ...createPostDto,
            user,
            image: imagePath,
        });
        return this.postsRepository.save(post);
    }
    async findAll() {
        return this.postsRepository.find({ relations: ['user', 'comments'] });
    }
    async findOne(id) {
        const post = await this.postsRepository.findOne({
            where: { id },
            relations: ['user', 'comments'],
        });
        if (!post) {
            throw new common_1.NotFoundException(`Post with ID ${id} not found`);
        }
        return post;
    }
    async findByUserId(userId) {
        const posts = await this.postsRepository.find({
            where: { user: { id: userId } },
            relations: ['user', 'comments'],
        });
        if (posts.length === 0) {
            throw new common_1.NotFoundException(`No posts found for user with ID ${userId}`);
        }
        return posts;
    }
    async delete(id) {
        const post = await this.findOne(id);
        if (post.image) {
            const publicId = post.image.split('/').pop().split('.')[0];
            await cloudinary_1.v2.uploader.destroy(`posts/${publicId}`);
        }
        await this.postsRepository.remove(post);
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        typeorm_2.Repository])
], PostService);
//# sourceMappingURL=posts.service.js.map