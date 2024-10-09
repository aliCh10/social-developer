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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./entities/user.entity");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        const existingUser = await this.findOneByEmailOrUsername(createUserDto.email, createUserDto.username);
        if (existingUser) {
            throw new common_1.BadRequestException('Email or Username already exists');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const { confirmPassword, ...userData } = createUserDto;
        const newUser = this.userRepository.create({ ...userData, password: hashedPassword });
        return this.userRepository.save(newUser);
    }
    async createGoogleUser(userDto) {
        const newUser = this.userRepository.create(userDto);
        return this.userRepository.save(newUser);
    }
    async createFacebookUser(userDto) {
        const newUser = this.userRepository.create(userDto);
        return this.userRepository.save(newUser);
    }
    async findOneByEmailOrUsername(email, username) {
        return await this.userRepository.findOne({ where: [{ email }, { username }] });
    }
    async findOneByEmail(email) {
        return await this.userRepository.findOne({ where: { email } });
    }
    async findOneByGoogleId(googleId) {
        return await this.userRepository.findOne({ where: { googleId } });
    }
    async findOneByFacebookId(facebookId) {
        return await this.userRepository.findOne({ where: { facebookId } });
    }
    async save(user) {
        return this.userRepository.save(user);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map