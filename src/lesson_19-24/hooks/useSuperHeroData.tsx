import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import superHero from '../models/superHero';

// const fetchSuperHero = async (heroID: number) => {
//     return axios.get<superHero[]>(`http://localhost:3000/superheroes/${heroID}`).then(res => res.data)
// }

export const fetchSuperHero = async ({ queryKey }: { queryKey: (string | number)[] }) => {
    const [, heroID] = queryKey
    return axios.get<superHero>(`http://localhost:3000/superheroes/${heroID}`).then(res => res.data)
}

const useSuperHeroData = (heroID: number) => {
    const queryClient = useQueryClient()
    return useSuspenseQuery({
        queryKey: ['superHeroes', heroID,],
        queryFn: fetchSuperHero,
        // queryFn: () => fetchSuperHero(heroID),
        /*
        initialData: TData | () => TData
        - Optional
        - If set, this value will be used as the initial data for the query cache (as long as the query hasn't been created or cached yet)
        - If set to a function, the function will be called once during the shared/root query initialization, and be expected to synchronously return the initialData
        - Initial data is considered stale by default unless a staleTime has been set
        - initialData is persisted to the cache
        */
        initialData: () => {
            const hero = queryClient.getQueryData<superHero[]>(['superHeroes'])?.find(hero => hero.id === heroID)
            if (hero) {
                return hero
            } else {
                return undefined
            }
        }
    })
}
export default useSuperHeroData