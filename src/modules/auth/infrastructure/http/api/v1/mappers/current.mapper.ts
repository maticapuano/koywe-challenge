import { User } from '@/modules/users/domain/contracts/user';
import { CurrentUserResponseDto } from '../dtos/current.dto';

export class CurrentUserMapper {
  private constructor() {
    throw new Error('Cannot create instance of static class');
  }

  public static toDto(data: User): CurrentUserResponseDto {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
