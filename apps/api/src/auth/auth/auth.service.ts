import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../../../lib/services/user/user.service';
import { IUser } from '@repo/api/index';
import { SignInData, SignupDto } from 'lib/types/auth.types';
import { UserPassService } from 'lib/services/userpass/userpass.service';
import bcrypt from 'bcrypt';
import { AccountService } from 'lib/services/account/account.service';
import { JwtService } from '@nestjs/jwt';
import { UserType } from 'lib/types/app.types';
import { UserTypeService } from 'lib/services/usertype/usertype.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private userPass: UserPassService,
    private accountService: AccountService,
    private ut : UserTypeService,
    private jwt: JwtService,
  ) {}

  async signIn(data: SignInData): Promise<IUser> {
    const user = await this.userService.getUserByEmail(data.email);
    if (!user) {
      throw new NotFoundException('Invalid user data, the user does not exist');
    }
    const userPass = await this.userPass.getUserPass(user.id);
    if (!userPass) {
      throw new NotFoundException('user does not exist in they system');
    }
    const validate = await bcrypt.compare(data.password, userPass.passwordHash);
    if (!validate) {
      throw new NotFoundException('user password is invalid');
    }
    // find the user password and match
    return user;
  }

  async signup(data: SignupDto): Promise<{ access_token: string }> | null {
    const u = await this.userService.getUserByEmail(data.email);
    if (u) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }
    const slt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, slt);

    const nu = await this.userService.createUser({
      email: data.email,
      name: data.name,
    });
    if (!nu) {
      throw new HttpException('Internal Server Error', HttpStatus.BAD_GATEWAY);
    }

    const us = (await this.ut.getAllUserTypes()).filter(x => x.name === UserType.Admin);
    
    const up = await this.userPass.createUserPass({
      userId: nu.id,
      isActive: true,
      passwordHash: hash,
      userTypeId  : us[0].id,
      passwordSalt: slt,
    });
    if (!up) {
      throw new HttpException('Internal server error', HttpStatus.BAD_REQUEST);
    }
    const acc = await this.accountService.createAccount({
      userId: nu.id,
      type: 'credentials',
      provider: 'credentials',
      providerAccountId: '',
    });
    if (!acc) {
      throw new HttpException('Internal server error', HttpStatus.BAD_REQUEST);
    }
    // sign the token
    const signed = await this.jwt.sign({ sub: nu.id, email: nu.email });
    return {
      access_token: signed,
    };
  }
}
