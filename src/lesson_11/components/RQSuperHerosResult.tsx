import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import superHero from '../models/superHero';
import { useState } from 'react';

const fetchSuperHero = async () => {
    return axios.get<superHero[]>(`http://localhost:3000/superheroes`).then(res => res.data)
}

const RQSuperHerosResult = () => {
    const [refetchInterval, setRefetchInterval] = useState<number | false>(3000)
    const { data, error, isFetching, isError, isSuccess } = useSuspenseQuery({
        queryKey: ['superHeroes'], queryFn: fetchSuperHero,
        refetchInterval: refetchInterval,
    })
    if (isError) {
        console.log(`preform error handling here`);
        throw error
    }
    if (isSuccess) {
        console.log(`preform success handling here`);
        if (data.length == 4 && refetchInterval !== false) {
            setRefetchInterval(false)
        }
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