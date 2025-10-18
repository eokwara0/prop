import { ApiProperty, } from '@nestjs/swagger';
import { IRole, ISession, IUserWithRoles } from '@repo/api/index';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SignInData {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

export class SignupDto {
  @IsString()
  @MinLength(30)
  name: string;
  @IsEmail()
  email: string;
  @MinLength(8)
  @MaxLength(20)
  password: string;
}

export class AuthToken {
  @ApiProperty()
  access_token: string;
}



export class IGetSession implements ISession {
  @ApiProperty()
  sessionToken: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  expires: string;
}
export class GetSessionRole implements IRole {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  id?: number;
  @ApiProperty()
  createdAt?: string;
}
export class GetSessionUserWithRoles implements IUserWithRoles {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  emailVerified?: Date;
  @ApiProperty()
  name?: string;
  @ApiProperty()
  image?: string;
  @ApiProperty({type : [GetSessionRole]})
  roles?: Array<GetSessionRole>
}




export class GetSessionAndUserResult {
  @ApiProperty()
  session: IGetSession;
  @ApiProperty()
  user: GetSessionUserWithRoles;
}