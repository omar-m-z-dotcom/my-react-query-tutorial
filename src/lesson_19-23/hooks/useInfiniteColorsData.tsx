import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import axios from "axios"
import color from "../models/color"

/* x-total-count
8 */

const xTotalCountHeaderParser = (xTotalCountHeader: string) => {
    const xTotalCountRegex = /(\d+)/i
    const [, xTotalCountMatch] = xTotalCountHeader.match(xTotalCountRegex) || []
    return Number(xTotalCountMatch)
}

const fetchColorsByPage = async ({ pageParam = 1 }) => {
    const response = axios.get<color[]>(`http://localhost:3000/colors?_page=${pageParam}&_limit=2`)
    return { colors: (await response).data, xTotalCount: xTotalCountHeaderParser((await response).headers["x-total-count"]) }
}

const useInfiniteColorsData = () => {
    return useSuspenseInfiniteQuery({
        queryKey: ["colors"],
        initialPageParam: 1,
        queryFn: ({ pageParam }) => fetchColorsByPage({ pageParam }),
        getNextPageParam: (_lastPage, allPages) => {
            if (allPages.length < allPages[0].xTotalCount / 2) {
                return allPages.length + 1
            }
            return undefined
        },
    })
}

export default useInfiniteColorsData
