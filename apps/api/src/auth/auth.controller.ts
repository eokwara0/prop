import { UserService } from 'lib/services/user/user.service';
import { AuthService } from './auth/auth.service';
import { SignInData, SignupDto } from 'lib/types/auth.types';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'lib/guards/auth.guard';
import { Public } from 'lib/guards/metadata/auth.guard.meta';


@UseGuards(AuthGuard)
@Controller('auth')
export class AuthController {
  constructor(
    private uService: UserService,
    private authService: AuthService,
    private jwt: JwtService,
  ) {}
  
  @Public()
  @Get('')
  getUsers() {
    return this.uService.getAllUsers();
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() data: SignInData): Promise<{ access_token: string }> {
    const user = await this.authService.signIn(data);
    if (!user) {
      throw new NotFoundException();
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwt.signAsync(payload),
    };
  }


  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signup(@Body() data : SignupDto ) : Promise<{access_token : string }>{
    return await this.authService.signup(data);
  }

  @Get('profile')
  async getProfile(@Request() req) : Promise<{ sub : string ; email : string ;}>{
    return req.user;
  }
}
