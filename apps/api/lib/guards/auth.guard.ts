import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from './metadata/auth.guard.meta';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwt: JwtService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret: process.env.JWT,
      });
      request['user'] = { token: token, ...payload };
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(req: any): string | undefined {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return atob(authHeader.split(' ')[1]);
    }

    // ✅ 2. Check cookies (when using res.cookie('access_token', ...))
    if (req.cookies && req.cookies['access_token']) {
      return atob(req.cookies['access_token']);
    }

    // ✅ 3. Check query param (optional)
    if (req.query && typeof req.query.token === 'string') {
      return req.query.token;
    }

    return undefined;
  }
}
