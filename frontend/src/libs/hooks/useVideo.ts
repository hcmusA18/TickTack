import { fetcher } from './fetcher'
import useSWR from 'swr'

// a custom hook to fetch video data by axiosInstance and cache it
// when videoId is repeated, it will return the cached data
export const useVideo = (videoId: string | null, options = {}) => {
  const { data, isLoading, error } = useSWR(videoId ? `/video/${videoId}` : null, fetcher, {
    revalidateOnFocus: false,
    ...options
  })
  return {
    video: data,
    isLoading,
    isError: error
  }
}
