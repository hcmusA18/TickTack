import axios, { AxiosInstance as Axios } from 'axios'

class AxiosInstance {
  private static _instance: AxiosInstance | null = null
  private contentType = 'application/json'
  private timeout = 3000
  private token = ''
  private baseURL = 'https://1314-42-115-164-149.ngrok-free.app'
  private instance: Axios | null = null

  private constructor() {
    this.instance = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout,
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${this.token}`
      }
    })
  }

  static getInstance(): AxiosInstance {
    if (!AxiosInstance._instance) {
      AxiosInstance._instance = new AxiosInstance()
    }
    return AxiosInstance._instance
  }

  setContentType(contentType: string) {
    this.contentType = contentType
    if (this.instance) {
      this.instance.defaults.headers['Content-Type'] = contentType
    }
  }

  setTimeout(timeout: number) {
    this.timeout = timeout
    if (this.instance) {
      this.instance.defaults.timeout = timeout
    }
  }

  setBaseURL(baseURL: string) {
    this.baseURL = baseURL
    if (this.instance) {
      this.instance.defaults.baseURL = baseURL
    }
  }

  setAuthToken(token: string) {
    this.token = token
    if (this.instance) {
      this.instance.defaults.headers.Authorization = `Bearer ${token}`
    }
  }

  getAxios() {
    return this.instance
  }
}

export default AxiosInstance.getInstance()
