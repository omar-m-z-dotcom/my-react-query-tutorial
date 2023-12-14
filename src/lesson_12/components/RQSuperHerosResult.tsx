import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import superHero from '../models/superHero';

const fetchSuperHero = async () => {
    return axios.get<superHero[]>(`http://localhost:3000/superheroes`).then(res => res.data)
}

const RQSuperHerosResult = () => {
    const { data, isFetching, error } = useSuspenseQuery({
        queryKey: ['superHeroes'], queryFn: fetchSuperHero,
        select(data) {
            return data.map(hero => {
                return { id: hero.id, name: hero.name }
            })
        },
    })
    if (error) {
        throw error
    }
    return (
        <>
            <h2>RQ Super Heros page</h2>
            {isFetching ? <div>checking for updates...</div> : null}
            {data.map(hero => {
                return <div key={hero.id}>{hero.name}</div>
            })}
        </>
    )
}
export default RQSuperHerosResult