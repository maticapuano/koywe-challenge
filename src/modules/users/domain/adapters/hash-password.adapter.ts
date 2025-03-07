export abstract class HashPasswordAdapter {
  /**
   * Hashes a plain text password
   * @param password - The plain text password to hash
   * @returns Promise containing the hashed password string
   */
  abstract hash(password: string): Promise<string>;

  /**
   * Compares a plain text password with a hashed password
   * @param password - The plain text password to compare
   * @param hash - The hashed password to compare against
   * @returns Promise containing boolean indicating if passwords match
   */
  abstract compare(password: string, hash: string): Promise<boolean>;
}
