import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import superHero from '../models/superHero';

// const fetchSuperHero = async (heroID: number) => {
//     return axios.get<superHero[]>(`http://localhost:3000/superheroes/${heroID}`).then(res => res.data)
// }

const fetchSuperHero = async ({ queryKey }: { queryKey: (string | number)[] }) => {
    const [, heroID] = queryKey
    return axios.get<superHero>(`http://localhost:3000/superheroes/${heroID}`).then(res => res.data)
}

const useSuperHeroData = (heroID: number) => {
    return useSuspenseQuery({
        queryKey: ['superHeroes', heroID,],
        queryFn: fetchSuperHero,
        // queryFn: () => fetchSuperHero(heroID),
    })
}
export default useSuperHeroData