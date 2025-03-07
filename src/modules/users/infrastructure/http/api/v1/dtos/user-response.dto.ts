import { User } from '@/modules/users/domain/contracts/user';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto implements User {
  @ApiProperty({ format: 'uuid' })
  public id: string;

  @ApiProperty({ example: 'John Doe' })
  public name: string;

  @ApiProperty({ format: 'email' })
  public email: string;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;
}
