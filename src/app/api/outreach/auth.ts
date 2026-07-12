export function isAuthorized(request: Request): boolean {
  const password = request.headers.get("x-admin-password");
  return password === process.env.ADMIN_PASSWORD;
}
