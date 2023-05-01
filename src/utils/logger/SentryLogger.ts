import { Logger, User } from 'utils/logger/types';
import * as Sentry from '@sentry/react';

export default class SentryLogger implements Logger {
  user: User | null = null;

  setUser(user: User | null) {
    this.user = user;

    if (user) {
      Sentry.setUser({
        id: String(user.id),
      });
    }
  }

  info(message: string, context?: unknown) {
    const scope = new Sentry.Scope();
    if (context) {
      scope.setExtra('context', context);
    }
    Sentry.captureMessage(message, scope);
  }

  warn(message: string, context?: unknown) {
    this.info(message, context);
  }

  error(message: string, error?: unknown, context?: Record<string, unknown>) {
    const scope = new Sentry.Scope();
    if (error) {
      scope.setExtra('message', message);
      if (context) {
        scope.setExtra('context', context);
      }
      Sentry.captureException(error, scope);
    } else {
      if (context) {
        scope.setExtra('context', context);
      }
      Sentry.captureMessage(message, scope);
    }
  }
}
