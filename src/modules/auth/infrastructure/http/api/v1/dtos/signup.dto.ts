import { UserResponseDto } from '@/modules/users/infrastructure/http/api/v1/dtos/user-response.dto';
import { ToLowerCase } from '@/shared/core/decorators/to-lower-case';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  public name: string;

  @ApiProperty({ format: 'email' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(70)
  @ToLowerCase()
  public email: string;

  @ApiProperty({ example: '12345678' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  public password: string;
}

export class SignUpResponseDto {
  @ApiProperty()
  public user: UserResponseDto;

  @ApiProperty({ format: 'jwt' })
  public accessToken: string;
}
