import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import superHero from '../models/superHero';

const fetchSuperHero = async () => {
    return axios.get<superHero[]>(`http://localhost:3000/superheroes`).then(res => res.data)
}

const RQSuperHerosResult = () => {
    const { data, error, isFetching, } = useSuspenseQuery({
        queryKey: ['superHeroes'], queryFn: fetchSuperHero,

        // ,gcTime: 5 * 60 * 1000 // gcTime is the cache time in milliseconds default is 5 minutes or 300000 milliseconds
        // staleTime: 0 // staleTime is the time in milliseconds before the cache is considered stale and a new request is made default is 0
        // refetchOnMount: true // refetchOnMount is a boolean that determines if the query should be refetched when the component mounts default is true
        // refetchOnWindowFocus: true // refetchOnWindowFocus is a boolean that determines if the query should be refetched when the window regains focus default is true
        // refetchInterval: 1000 // refetchInterval is the time in milliseconds between refetches default is false
        // refetchIntervalInBackground: true // refetchIntervalInBackground is a boolean that determines if the query should be refetched when the window is in the background default is false
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