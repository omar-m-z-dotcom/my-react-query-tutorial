import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import superHero from '../models/superHero';

const fetchSuperheroes = async () => {
    const axiosResponse = await axios.get<superHero[]>(`http://localhost:3000/superheroes`)
    console.log(axiosResponse.headers);
    return axiosResponse.data
}

const useSuperHerosData = () => {
    return useSuspenseQuery({
        queryKey: ['superHeroes'],
        queryFn: fetchSuperheroes,
    })
}
export default useSuperHerosData