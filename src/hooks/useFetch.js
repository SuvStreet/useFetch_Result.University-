import { useEffect, useState } from 'react'

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

  async function fetchData(params = '') {
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
    }
  }

  function refetch({ params }) {
    setError(null)
    setIsLoading(true)
    fetchData(params)
  }

  return {
    data,
    isLoading,
    refetch,
    error,
  }
}
