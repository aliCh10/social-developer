"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeModule = void 0;
const common_1 = require("@nestjs/common");
const like_service_1 = require("./like.service");
const like_controller_1 = require("./like.controller");
const typeorm_1 = require("@nestjs/typeorm");
const like_entity_1 = require("./entities/like.entity");
const user_entity_1 = require("../user/entities/user.entity");
const post_entity_1 = require("../posts/entities/post.entity");
let LikeModule = class LikeModule {
};
exports.LikeModule = LikeModule;
exports.LikeModule = LikeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([like_entity_1.Like, post_entity_1.Post, user_entity_1.User])],
        providers: [like_service_1.LikeService],
        controllers: [like_controller_1.LikeController],
    })
], LikeModule);
//# sourceMappingURL=like.module.js.map