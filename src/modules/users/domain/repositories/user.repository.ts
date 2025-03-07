import { CreateUser, User } from '../contracts/user';

export abstract class UserRepository {
  /**
   * Finds a user by their unique identifier
   * @param id - The unique identifier of the user
   * @returns Promise that resolves to the user if found, null otherwise
   */
  abstract findById(id: string): Promise<User | null>;

  /**
   * Finds a user by their email address
   * @param email - The email address of the user
   * @returns Promise that resolves to the user if found, null otherwise
   */
  abstract findByEmail(email: string): Promise<User | null>;

  /**
   * Creates a new user in the repository
   * @param user - The user data required for creation
   * @returns Promise that resolves to the created user
   */
  abstract create(user: CreateUser): Promise<User>;
}
