import { SignInUseCaseOutput } from '@/modules/auth/application/use-cases/signin.case';
import { SignInResponseDto } from '../dtos/signin.dto';

export class SignInMapper {
  private constructor() {
    throw new Error('Cannot create instance of static class');
  }

  public static toDto(data: SignInUseCaseOutput): SignInResponseDto {
    return {
      user: {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        createdAt: data.user.createdAt,
        updatedAt: data.user.updatedAt,
      },
      accessToken: data.accessToken,
    };
  }
}
