import { v4 as uuidv4 } from 'uuid';

export default class ServiceError extends Error {
  public id: string;
  public name: string;
  public message: string;
  public code?: string;
  public type = 'ServiceError';
  public timestamp: number;

  constructor(code: string, message: string, realError?: any) {
    super(message);
    this.id = uuidv4();
    this.code = code;
    this.message = message;
    this.timestamp = Date.now();

    if (realError) console.log(realError);
  }

  static UserAlreadyExists(email: string) {
    const message = `User with email '${email}' already exists`;

    return new ServiceError('USER_EXISTS', message);
  }

  static UserAlreadyHasThisRole(email: string, role: string) {
    const message = `User '${email}' already has ${role} role`;

    return new ServiceError('ROLE_EXISTS_ON_USER', message);
  }
}
