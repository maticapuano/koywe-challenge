export abstract class JwtAdapter {
  /**
   * Signs a new access token for a given user ID.
   * @param userId - The unique identifier of the user to create token for
   * @returns A Promise that resolves to the signed JWT access token string
   */
  public abstract signAccessToken(userId: string): Promise<string>;

  /**
   * Verifies and decodes a JWT access token.
   * @param token - The JWT access token string to verify
   * @returns A Promise that resolves to the user ID from the token payload
   * @throws {InvalidAccessTokenException} When the token is invalid or expired
   */
  public abstract verifyAccessToken(token: string): Promise<string>;
}
