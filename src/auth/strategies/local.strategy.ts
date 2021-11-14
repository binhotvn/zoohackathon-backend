import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: UsersService) {
    super({
      usernameField: 'eop'
    });
  }

  async validate(eop: string, password: string): Promise<any> {
    
    const user = await this.authService.vaildLogin(eop, password);
    if (!user['data']) {
      throw new UnauthorizedException(user.message);
    }
    return user['data'];
  }
}
  