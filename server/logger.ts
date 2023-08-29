/**
 * Better than console logging
 */

import { LogType } from '../types/types';

const logger = (logType: LogType, message: string): void => {
  let colorCode = 0; // LogType.NORMAL
  switch (logType) {
    case LogType.SUCCESS:
      colorCode = 32;
      break;
    case LogType.ERROR:
      colorCode = 31;
      break;
    case LogType.WARNING:
      colorCode = 33;
      break;
    default:
      break;
  }
  console.log(`\u001b[1;${colorCode}m ${`[${logType}] ${message}`}`);
};

export default logger;
