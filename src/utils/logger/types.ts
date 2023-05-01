export interface User {
  id: number;
}

export interface Logger {
  user: User | null;

  setUser: (user: User | null) => void;

  info: (message: string, context?: Record<string, unknown>) => void;

  warn: (message: string, context?: Record<string, unknown>) => void;

  error: (
    message: string,
    error?: unknown,
    context?: Record<string, unknown>,
  ) => void;
}
