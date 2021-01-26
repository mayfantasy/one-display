export const validatePassword = (p: string) => {
  return p.length >= 7 && /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(p)
}
