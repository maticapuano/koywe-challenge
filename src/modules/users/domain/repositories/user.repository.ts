import { CreateUser, User, UserWithPassword } from '../contracts/user';

export abstract class UserRepository {
  /**
   * Finds a user by their unique identifier
   * @param id - The unique identifier of the user
   * @returns Promise that resolves to the user if found, null otherwise
   */
  public abstract findById(id: string): Promise<User | null>;

  /**
   * Finds a user by their email address
   * @param email - The email address of the user
   * @returns Promise that resolves to the user if found, null otherwise
   */
  public abstract findByEmail(email: string): Promise<User | null>;

  /**
   * Finds a user by their email address, including their password
   * @param email - The email address of the user
   * @param options - An object containing the includePassword option
   * @returns Promise that resolves to the user if found, null otherwise
   */
  public abstract findByEmail(
    email: string,
    options: { includePassword: true },
  ): Promise<UserWithPassword | null>;

  /**
   * Creates a new user in the repository
   * @param user - The user data required for creation
   * @returns Promise that resolves to the created user
   */
  public abstract create(user: CreateUser): Promise<User>;
}
