/**
 * Creates a function that sets the HTTP status code, headers, and response body.
 *
 * @param {number} statusCode - The HTTP status code to set.
 * @param {string} message - The message to include in the response body.
 * @param {object} header - An optional object containing the header name and value.
 * @param {string} header.name - The name of the header.
 * @param {string} header.value - The value of the header.
 * @return {function} A function that sets the HTTP status code, headers, and response body.
 */
export function statusHttpServer(req, res) {
  /**
   * Creates an HTTP response with the given status code, message, and header.
   *
   * @param {number} statusCode - The status code of the HTTP response.
   * @param {object} message - The message to be included in the response.
   * @param {object} header - An optional header object containing name and value properties.
   * @return {undefined} - This function does not return a value.
   */
  const statusHttpCreator = (statusCode, message, header) => {
    res.statusCode = statusCode;
    if (header) {
      res.setHeader(header.name, header.value);
    }
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify(message));
  };
  return statusHttpCreator;
}
