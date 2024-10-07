import { Router } from 'creaton-js'

export const emitRouter = new Router()

export const httpRequest = (url, method = 'GET', type = 'json') => {
  const xhr = new XMLHttpRequest()
  xhr.open(method, url)
  xhr.responseType = type
  xhr.send()
  return new Promise(ok => xhr.onload = () => ok(xhr.response))
}