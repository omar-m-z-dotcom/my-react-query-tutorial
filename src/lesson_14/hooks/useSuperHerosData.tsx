import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import superHero from '../models/superHero';

const fetchSupersHero = async () => {
    return axios.get<superHero[]>(`http://localhost:3000/superheroes`).then(res => res.data)
}

const useSuperHerosData = () => {
    return useSuspenseQuery({
        queryKey: ['superHeroes'],
        queryFn: fetchSupersHero,
    })
}
export default useSuperHerosData