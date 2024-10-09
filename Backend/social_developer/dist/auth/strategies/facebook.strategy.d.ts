import { Profile } from 'passport-facebook';
import { AuthService } from '../auth.service';
declare const FacebookStrategy_base: new (...args: any[]) => any;
export declare class FacebookStrategy extends FacebookStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(accessToken: string, refreshToken: string, profile: Profile, done: Function): Promise<any>;
}
export {};
