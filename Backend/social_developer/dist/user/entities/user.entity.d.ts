import { Comment } from 'src/comments/entities/comment.entity';
import { Conversation } from 'src/conversation/entities/conversation.entity';
import { Like } from 'src/like/entities/like.entity';
import { Message } from 'src/message/entities/message.entity';
import { Post } from 'src/posts/entities/post.entity';
export declare class User {
    id: number;
    googleId: string;
    email: string;
    password: string;
    username: string;
    facebookId: string;
    posts: Post[];
    followers: User[];
    following: User[];
    sentMessages: Message[];
    receivedMessages: Message[];
    initiatedConversations: Conversation[];
    receivedConversations: Conversation[];
    isOnline: boolean;
    comments: Comment[];
    likes: Like[];
}
