import { useCookies } from 'react-cookie'

export const useCookie = <T>(key: string) => {
  const [cookie] = useCookies([key])
  const value = cookie[key]

  if (value === 'undefined' || value === undefined) {
    return undefined
  } else {
    return value as T
  }
}
