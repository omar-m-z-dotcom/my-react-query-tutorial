import { useSuspenseQueries } from "@tanstack/react-query"
import { fetchSuperHero } from "./useSuperHeroData"

const useSelectedSuperHerosData = (heroIDs: number[]) => {
    return useSuspenseQueries({
        queries: heroIDs.map((heroID) => (
            {
                queryKey: ['superHero', heroID],
                queryFn: fetchSuperHero,
            }
        )),
    })
}
export default useSelectedSuperHerosData