import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';
import { AuthService } from '../auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['id', 'emails', 'name', 'photos'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: Function) {
    const { emails, id, name, photos } = profile; // Extract name and photos
  
    // Extract email, if available
    const email = emails && emails.length > 0 ? emails[0].value : null;
    const photoUrl = photos && photos.length > 0 ? photos[0].value : null;

    // Log the profile for debugging

    // Check if the email is available
    if (!email) {
      return done(new Error('No email provided by Facebook'), false);
    }
    const user = {
      facebookId: id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
    };
    const validatedUser = await this.authService.createOrUpdateFacebookUser(user);
    done(null, validatedUser);
  }
}
