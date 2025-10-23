import { UserService } from 'lib/services/user/user.service';
import { AuthService } from './auth/auth.service';
import {
  AuthToken,
  GetSessionAndUserResult,
  SignInData,
  SignupDto,
} from 'lib/types/auth.types';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'lib/guards/auth.guard';
import { Public } from 'lib/guards/metadata/auth.guard.meta';
import { ApiOkResponse } from '@nestjs/swagger';

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
  @ApiOkResponse({ type: AuthToken })
  @Post('login')
  async login(
    @Res({ passthrough: true }) res,
    @Body() data: SignInData,
  ): Promise<AuthToken> {
    const user = await this.authService.signIn(data);
    if (!user) {
      throw new NotFoundException();
    }
    const payload = { sub: user.id, email: user.email };
    const token = await this.jwt.signAsync(payload);
    res.cookie('access_token', btoa(token), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return {
      access_token: token,
    };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AuthToken })
  @Post('signup')
  async signup(@Body() data: SignupDto): Promise<AuthToken> {
    return await this.authService.signup(data);
  }

  @Get('profile')
  @ApiOkResponse({ type: GetSessionAndUserResult })
  async getProfile(@Request() req): Promise<GetSessionAndUserResult> {
    const usr = await this.authService.getSessionAndUser(req.user.sub);

    return {
      session: {
        expires: req.user['exp'],
        sessionToken: req.user['token'],
        userId: req['sub'],
      },
      user: {
        ...usr,
      },
    };

    // return req.user;
  }

  @Get('get-id')
  @ApiOkResponse({ type : String })
  async getUserId(@Request() req): Promise<string> {
    return req.user.sub;
  }
}
