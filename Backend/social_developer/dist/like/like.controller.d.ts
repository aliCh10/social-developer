import { LikeService } from './like.service';
export declare class LikeController {
    private readonly likeService;
    constructor(likeService: LikeService);
    addLike(postId: number, userId: number): Promise<import("./entities/like.entity").Like>;
    removeLike(postId: number, userId: number): Promise<void>;
    getLikesCount(postId: number): Promise<number>;
}
