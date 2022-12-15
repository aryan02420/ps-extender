import { PSData, PSError, PSResponses, PSUrl } from "./types"

type PSRequestInit = Omit<RequestInit, 'body'> & { body?: Parameters<typeof JSON.stringify>[0] }

export class PSDInternalServerError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "InternalServerError"
  }
}

export class PSDNoData extends Error {
  constructor(message: string) {
    super(message)
    this.name = "NoData"
  }
}

export async function psdFetch<U extends PSUrl>(url: U, options: PSRequestInit = {}) {
  const {headers, body, ...rest} = options
  const res = await fetch(url, {
    headers: {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json; charset=UTF-8",
      "sec-gpc": "1",
      "x-requested-with": "XMLHttpRequest",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      ...headers
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    body: JSON.stringify(body),
    method: "POST",
    mode: "cors",
    credentials: "include",
    ...rest
  })
  const resJson = await res.json() as PSData | PSError
  if (!res.ok) {
    throw new PSDInternalServerError(`${(resJson as PSError).ExceptionType}\n${(resJson as PSError).Message}`)
  }
  const data = JSON.parse((resJson as PSData).d) as any[]
  if (data.length === 0) throw new PSDNoData(`Could not find any data for ${url}`)
  return data as PSResponses<U>
}
