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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async register(createUserDto) {
        const newUser = await this.userService.create(createUserDto);
        return this.login(newUser);
    }
    async createOrUpdateGoogleUser(userDto) {
        let user = await this.userService.findOneByGoogleId(userDto.googleId);
        if (user) {
            return this.userService.save({ ...user, ...userDto });
        }
        else {
            return this.userService.createGoogleUser(userDto);
        }
    }
    async createOrUpdateFacebookUser(userDto) {
        if (!userDto.facebookId) {
            throw new common_1.BadRequestException('Facebook ID is required to create or update a user.');
        }
        let user = await this.userService.findOneByFacebookId(userDto.facebookId);
        if (user) {
            return this.userService.save({ ...user, ...userDto });
        }
        user = await this.userService.findOneByEmail(userDto.email);
        if (user) {
            return this.userService.save({ ...user, facebookId: userDto.facebookId });
        }
        return this.userService.createFacebookUser(userDto);
    }
    async validateUser(email, password) {
        const user = await this.userService.findOneByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }
    async login(user) {
        const payload = { username: user.username, id: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map