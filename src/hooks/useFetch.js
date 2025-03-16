import { useCallback, useEffect, useState } from 'react'

export function useFetch(url, options) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(
    async (options = {}) => {
      try {
        setIsLoading(true)
        let response = null

        if (options.params) {
          const param = Object.entries(options.params)
          response = await fetch(
            `${url}?${param.map(([key, value]) => `${key}=${value}`).join('&')}`
          )
        } else {
          response = await fetch(url)
        }

        const data = await response.json()
        setIsLoading(false)
        setData(data)
      } catch (error) {
        setIsLoading(false)
        setError(error)
      } finally {
        setIsLoading(false)
      }
    },
    [url, options]
  )

  useEffect(() => {
    fetchData(options)
    return () => {
      setError(null)
      setIsLoading(true)
      setData(null)
    }
  }, [fetchData])

  return {
    data,
    isLoading,
    refetch: fetchData,
    error,
  }
}
