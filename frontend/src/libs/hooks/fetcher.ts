import axiosInstance from 'libs/utils/axiosInstance'

export const fetcher = (url: string) =>
  axiosInstance
    .getAxios()
    .get(url)
    .then((res) => res.data)
