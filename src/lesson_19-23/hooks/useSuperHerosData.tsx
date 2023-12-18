import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import superHero from '../models/superHero';

const fetchSuperheroes = async () => {
    return axios.get<superHero[]>(`http://localhost:3000/superheroes`).then(res => res.data)
}

const useSuperHerosData = () => {
    return useSuspenseQuery({
        queryKey: ['superHeroes'],
        queryFn: fetchSuperheroes,
    })
}
export default useSuperHerosData

const addSuperHero = async (hero: superHero) => {
    return axios.post<superHero>(`http://localhost:3000/superheroes`, hero)
}


export const useAddSuperHero = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: addSuperHero,
        onSuccess: (query) => {
            // QqueryClient.invalidateQueries({ queryKey: ['superHeroes'], })
            queryClient.setQueryData<superHero[]>(['superHeroes'], (oldData) => {
                console.log(query, oldData);

                if (oldData) {
                    return [...oldData, query.data]
                }
            })
        }
    })
}