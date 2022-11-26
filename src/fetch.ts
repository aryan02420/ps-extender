import { PSData, PSError, PSResponses, PSUrl } from "./types"

export async function psdFetch<U extends PSUrl>(url: U, options: RequestInit = {}) {
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
  if (!res.ok) throw new Error(JSON.stringify(await res.json() as PSError))
  const resJson = await res.json() as PSData
  return JSON.parse(resJson.d) as PSResponses<U>
}
