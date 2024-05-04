import useSWR from 'swr'
import { fetcher } from './fetcher'

// a custom hook to fetch user data by axiosInstance and cache it
// when userId is repeated, it will return the cached data
export const useMusic = (musicId: string | null, options = {}) => {
  const { data, isLoading, error } = useSWR(musicId ? `/music/${musicId}` : null, fetcher, {
    revalidateOnFocus: false,
    ...options
  })
  return {
    music: data?.data,
    isLoading,
    isError: error
  }
}
