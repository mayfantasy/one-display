import { AxiosResponse } from 'axios'
import { api } from 'requests/client'
import {
  IAboutUsContent,
  IContactUsContent,
  IPriceMatchPolicyContent,
} from 'types/content.types'

export const aboutPageContentRequest = (): Promise<
  AxiosResponse<{
    result: IAboutUsContent
  }>
> => {
  return api.get('/api/content/about-us')
}

export const contactPageContentRequest = (): Promise<
  AxiosResponse<{
    result: IContactUsContent
  }>
> => {
  return api.get('/api/content/contact-us')
}

export const priceMatchPolicyContentRequest = (): Promise<
  AxiosResponse<{
    result: IPriceMatchPolicyContent
  }>
> => {
  return api.get('/api/content/price-match-policy')
}
