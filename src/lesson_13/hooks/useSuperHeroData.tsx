import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import superHero from '../models/superHero';

const fetchSuperHero = async () => {
    return axios.get<superHero[]>(`http://localhost:3000/superheroes`).then(res => res.data)
}

const useSuperHeroData = () => {
    return useQuery({
        queryKey: ['superHeroes'],
        queryFn: fetchSuperHero,
        refetchOnWindowFocus: false, // This is the key to prevent refetching on window focus change default is true
        refetchOnMount: 'always'
    })
}
export default useSuperHeroData