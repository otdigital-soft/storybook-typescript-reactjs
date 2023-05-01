import SentryLogger from 'utils/logger/SentryLogger';
import ConsoleLogger from 'utils/logger/ConsoleLogger';

const Logger = process.env.REACT_APP_SENTRY_DSN ? SentryLogger : ConsoleLogger;

export default new Logger();
