export const isTokenValid = (token: string, expire_in: number) => {
  if (!token) return false;
  if (!expire_in) return false;
  const time = Math.floor(Date.now() / 1000);
  return time < expire_in;
};
