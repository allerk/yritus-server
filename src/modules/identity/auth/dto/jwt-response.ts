export class JwtResponse {
  constructor(
    public readonly token: string,
    public readonly refreshToken: string,
    public readonly username: string,
    public readonly email: string,
    public readonly userId: string,
  ) {}
}
