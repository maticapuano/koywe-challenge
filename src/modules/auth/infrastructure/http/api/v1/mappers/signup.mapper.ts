import { SignUpUseCaseOutput } from '@/modules/auth/application/use-cases/signup.case';
import { SignUpResponseDto } from '../dtos/signup.dto';

export class SignUpMapper {
  private constructor() {
    throw new Error('Cannot create instance of static class');
  }

  public static toDto(data: SignUpUseCaseOutput): SignUpResponseDto {
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
