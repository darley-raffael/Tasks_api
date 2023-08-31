import querystring from "node:querystring";

/**
 * Parses the query string from a URL and returns an object with the normalized query parameters.
 *
 * @param {string} url - The URL containing the query string.
 * @return {object} An object with the normalized query parameters.
 */
export async function queryString(url) {
  // Parse the query.
  const query = querystring.parse(url.split("?")[1]);
  const queryNormalized = Object.fromEntries(
    Object.entries(query).map(([key, value]) => [
      key,
      typeof value === "string" ? value.toLowerCase() : value,
    ])
  );

  return queryNormalized;
}
