// export class StatusHttpServer {
//   #req;
//   #res;
//   constructor(req, res) {
//     this.#req = req;
//     this.#res = res;
//   }
//   /**
//    * Sets the HTTP status code, sets the response header if provided, and sends a JSON response.
//    *
//    * @param {number} statusCode - The HTTP status code to be set.
//    * @param {string | object} message - The message to be included in the JSON response.
//    * @param {object} header - (optional) An object containing the name and value of the header to be set.
//    * @return {void}
//    */
//   async statusHttp(statusCode, message, header) {
//     this.#res.statusCode = statusCode;
//     if (header) {
//       this.#res.setHeader(header.name, header.value);
//     }
//     this.#res.setHeader("Content-type", "application/json");
//     this.#res.end(JSON.stringify({ message }));
//   }
// }

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
