import { CreatePostDto } from './create-post.dto';
declare const UpdatePostDto_base: import("@nestjs/common").Type<Partial<CreatePostDto>>;
export declare class UpdatePostDto extends UpdatePostDto_base {
    description?: string;
}
export {};
