import { CurrentUserUseCase } from '@/modules/auth/application/use-cases/current.case';
import { SignInUseCase } from '@/modules/auth/application/use-cases/signin.case';
import { SignUpUseCase } from '@/modules/auth/application/use-cases/signup.case';
import { GetCurrentUserId } from '@/shared/core/decorators/get-current-user-id';
import { IsPublic } from '@/shared/core/decorators/is-public';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CurrentUserResponseDto } from '../dtos/current.dto';
import { SignInDto, SignInResponseDto } from '../dtos/signin.dto';
import { SignUpDto, SignUpResponseDto } from '../dtos/signup.dto';
import { CurrentUserMapper } from '../mappers/current.mapper';
import { SignInMapper } from '../mappers/signin.mapper';
import { SignUpMapper } from '../mappers/signup.mapper';

@Controller({
  path: '/auth',
  version: '1',
})
@ApiTags('Auth')
export class AuthController {
  public constructor(
    private readonly _signUpUseCase: SignUpUseCase,
    private readonly _signInUseCase: SignInUseCase,
    private readonly _currentUserUseCase: CurrentUserUseCase,
  ) {}

  @Get('/me')
  @ApiOkResponse({
    description: 'Current user info',
    type: CurrentUserResponseDto,
  })
  @ApiOperation({ summary: 'Get current user' })
  @ApiUnauthorizedResponse({ description: 'Invalid access token' })
  @ApiBearerAuth()
  public async current(
    @GetCurrentUserId() userId: string,
  ): Promise<CurrentUserResponseDto> {
    const result = await this._currentUserUseCase.execute({ userId });

    return CurrentUserMapper.toDto(result);
  }

  @Post('/signup')
  @IsPublic()
  @ApiOperation({ summary: 'Sign up' })
  @ApiCreatedResponse({ description: 'User created', type: SignUpResponseDto })
  @ApiConflictResponse({ description: 'User already exists' })
  @ApiUnprocessableEntityResponse({ description: 'Validation error' })
  public async signup(@Body() data: SignUpDto): Promise<SignUpResponseDto> {
    const result = await this._signUpUseCase.execute(data);

    return SignUpMapper.toDto(result);
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  @ApiOperation({ summary: 'Sign in' })
  @ApiOkResponse({ description: 'User signed in', type: SignInResponseDto })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiUnprocessableEntityResponse({ description: 'Validation error' })
  public async signin(@Body() data: SignInDto): Promise<SignInResponseDto> {
    const result = await this._signInUseCase.execute(data);

    return SignInMapper.toDto(result);
  }
}
