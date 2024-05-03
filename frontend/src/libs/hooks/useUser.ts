import useSWR from 'swr'
import { fetcher } from './fetcher'

// a custom hook to fetch user data by axiosInstance and cache it
// when userId is repeated, it will return the cached data
export const useUser = (userId: string | null, options = {}) => {
  const { data, isLoading, error } = useSWR(userId ? `/user/${userId}` : null, fetcher, {
    revalidateOnFocus: false,
    ...options
  })
  return {
    user: data,
    isLoading,
    isError: error
  }
}
