/**
 * Extracts route parameters from the given path.
 *
 * @param {string | RegExp} path - The path containing route parameters.
 * @return {RegExp} - A regular expression representing the path with route parameters replaced.
 */
export function extractRouteParams(path) {
  const routeParamsRegex = /:([a-zA-Z]+)/g;

  const regexReplace = /(?<$1>[a-z0-9\-_]+)/;

  try {
    const pathWithParams = path.replaceAll(routeParamsRegex, regexReplace);
    return new RegExp(`^${pathWithParams}`);
  } catch (e) {
    console.error(e);

    return new RegExp(path);
  }

  // if (typeof path === "string") {
  //   return new RegExp(`^${path.replaceAll(routeParamsRegex, regexReplace)}`);
  // }

  // return new RegExp(path);
}
