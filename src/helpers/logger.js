const config = {
  path: "/log/log.txt",
};
/**
 * Singleton Logger
 */
class Logger {
  constructor(config) {
    // eslint-disable-next-line no-undef
    authenticateLogger(config);
  }
  log(...logs) {
    // eslint-disable-next-line no-undef
    sendLogsToLogManagementTool(...logs);
    console.log(...logs);
  }
}
const logger = new Logger(config);
export default logger;
