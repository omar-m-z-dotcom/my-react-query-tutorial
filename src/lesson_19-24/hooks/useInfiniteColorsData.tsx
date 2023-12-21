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
const limit = 2
const fetchColorsByPage = async ({ pageParam = 1 }) => {
    const response = axios.get<color[]>(`http://localhost:3000/colors?_page=${pageParam}&_limit=${limit}`)
    return { colors: (await response).data, xTotalCount: xTotalCountHeaderParser((await response).headers["x-total-count"]) }
}

const useInfiniteColorsData = () => {
    return useSuspenseInfiniteQuery({
        queryKey: ["colors-infinite"],
        /*
        initialPageParam: TPageParam
        - Required
        - The default page param to use when fetching the first page.
         */
        initialPageParam: 1,
        /*
        queryFn: (context: QueryFunctionContext) => Promise<TData>
        - Required, but only if no default query function has been defined defaultQueryFn
        - The function that the query will use to request data.
        - Receives a QueryFunctionContext
        - Must return a promise that will either resolve data or throw an error.
         */
        queryFn: ({ pageParam }) => fetchColorsByPage({ pageParam }),
        /*
        getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => TPageParam | undefined | null
        - Required
        - When new data is received for this query, this function receives both the last page of the infinite list of data and the full array of all pages, as well as pageParam information.
        - It should return a single variable (a.k.a the next pageParam) that will be passed as the last optional parameter to your query function.
        - Return undefined or null to indicate there is no next page available.
         */
        getNextPageParam: (_lastPage, allPages) => {
            if (allPages.length < allPages[0].xTotalCount / limit) {
                return allPages.length + 1
            }
            return undefined
        },
    })
}

export default useInfiniteColorsData
