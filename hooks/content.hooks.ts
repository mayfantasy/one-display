import { useEffect, useState } from 'react'
import {
  aboutPageContentRequest,
  contactPageContentRequest,
  priceMatchPolicyContentRequest,
} from 'requests/content.request'
import {
  IAboutUsContent,
  IContactUsContent,
  IPriceMatchPolicyContent,
} from 'types/content.types'

export const useAboutUsContent = () => {
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState<IAboutUsContent>()

  useEffect(() => {
    setLoading(true)
    aboutPageContentRequest()
      .then((res) => {
        setContent(res.data.result)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { loading, content }
}

export const usePriceMatchPolicyContent = () => {
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState<IPriceMatchPolicyContent>()

  useEffect(() => {
    setLoading(true)
    priceMatchPolicyContentRequest()
      .then((res) => {
        setContent(res.data.result)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { loading, content }
}

export const useContactUsContent = () => {
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState<IContactUsContent>()

  useEffect(() => {
    setLoading(true)
    contactPageContentRequest()
      .then((res) => {
        setContent(res.data.result)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { loading, content }
}
