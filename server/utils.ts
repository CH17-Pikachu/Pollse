/**
 * Creates error object that can be used in global error handler
 * @param controller controller file error occurred in
 * @param method method label error occurred in
 * @param type bad body, sql error, etc
 * @param err from catch
 * @returns error object for global handler
 */
export const createError = (
  controller: string,
  method: string,
  type: string,
  err: unknown,
) => ({
  log: `${controller}.${method} ${type}: ERROR: ${JSON.stringify(err)}`,
  message: {
    err: `Error occurred in ${controller}.${method}. Check server logs for more details.`,
  },
});

export default {};
