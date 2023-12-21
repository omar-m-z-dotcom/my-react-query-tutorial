import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import color from "../models/color"

/* link
<http://localhost:3000/colors?_page=1&_limit=2>; rel="first", <http://localhost:3000/colors?_page=2&_limit=2>; rel="next", <http://localhost:3000/colors?_page=4&_limit=2>; rel="last" */

/* link
<http://localhost:3000/colors?_page=1&_limit=2>; rel="first", <http://localhost:3000/colors?_page=1&_limit=2>; rel="prev", <http://localhost:3000/colors?_page=3&_limit=2>; rel="next", <http://localhost:3000/colors?_page=4&_limit=2>; rel="last" */


const linkHeaderParser = (linkHeader: string) => {
    const links = linkHeader.split(", ")
    const linkMap = new Map<string, string>()
    links.forEach((link) => {
        const [url, rel] = link.split("; ")
        const urlRegex = /<(.*)>/i
        const [, urlMatch] = url.match(urlRegex) || []
        const relRegex = /rel="(.*)"/i
        const [, relMatch] = rel.match(relRegex) || []
        linkMap.set(relMatch, urlMatch)
    })
    return linkMap
}
const fetchColors = async (url: string) => {
    const response = axios.get<color[]>(url)
    return { data: (await response).data, link: linkHeaderParser((await response).headers["link"]) }
}

const useColorsData = (url: string = "http://localhost:3000/colors?_page=1&_limit=2") => {
    return useQuery({
        queryKey: ["colors", url],
        queryFn: () => fetchColors(url),
        /*
        placeholderData: TData | (previousValue: TData | undefined; previousQuery: Query | undefined,) => TData
        - Optional
        - If set, this value will be used as the placeholder data for this particular query observer while the query is still in the pending state.
        - placeholderData is not persisted to the cache.
        - If you provide a function for placeholderData, as a first argument you will receive previously watched query data if available, and the second argument will be the complete previousQuery instance.
        */
        placeholderData: (previousValue, previousQuery) => {
            if (previousValue) {
                return previousValue
            }
            else if (previousQuery) {
                return previousQuery.state.data
            } else {
                return undefined
            }
        }
    })
}

export default useColorsData