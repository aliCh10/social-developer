import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, Profile } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      scope: ['email'],
      profileFields: ['id', 'emails', 'name'], // Champs du profil à récupérer
    });
  }

  // Méthode de validation, on peut utiliser ici un UserService pour gérer l'utilisateur
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: Function,
  ): Promise<any> {
    const { name, emails } = profile;
    const user = {
      email: emails && emails[0].value,
      firstName: name?.givenName,
      lastName: name?.familyName,
      accessToken,
    };
    done(null, user); // Appelle done avec l'utilisateur pour l'attacher à la requête
  }
}
