/**
 * Extracts route parameters from the given path.
 *
 * @param {string | RegExp} path - The path containing route parameters.
 * @return {RegExp} - A regular expression representing the path with route parameters replaced.
 */
export function extractRouteParams(path) {
  // Remove trailing slashes
  const pathValid = path.replace(/\/$/, "");
  const routeParamsRegex = /:([a-zA-Z]+)/g;
  // Inclui a validação de UUID na variável regexReplace
  const regexReplace =
    "(?<$1>[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})";

  if (typeof path === "string") {
    const pathWithParams = pathValid.replace(routeParamsRegex, regexReplace);
    return new RegExp(`^${pathWithParams}`);
  }

  return new RegExp(path);
}
