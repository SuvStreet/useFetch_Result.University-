import { useCallback, useEffect, useState } from 'react'

export function useFetch(url) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
    return () => {
      setError(null)
      setIsLoading(true)
      setData(null)
    }
  }, [])

  const fetchData = useCallback(
    async ({ params } = '') => {
      try {
        const response = await fetch(
          params ? `${url}?_limit=${params._limit}` : url
        )
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
    [url]
  )

  return {
    data,
    isLoading,
    refetch: fetchData,
    error,
  }
}
