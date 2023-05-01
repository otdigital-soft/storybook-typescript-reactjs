import { Logger, User } from 'utils/logger/types';

export default class ConsoleLogger implements Logger {
  user: User | null = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {}

  setUser(user: User | null) {
    this.user = user;
  }

  info(message: string, ...optionalParams: unknown[]) {
    console.info(message, ...optionalParams);
  }

  warn(message: string, ...optionalParams: unknown[]) {
    console.warn(message, ...optionalParams);
  }

  error(message: string, ...optionalParams: unknown[]) {
    console.error(message, ...optionalParams);
  }
}
