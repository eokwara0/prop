import { ApiProperty } from '@nestjs/swagger';
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
