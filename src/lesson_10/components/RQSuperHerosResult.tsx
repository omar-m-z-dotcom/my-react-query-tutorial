import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import superHero from '../models/superHero';

const fetchSuperHero = async () => {
    return axios.get<superHero[]>(`http://localhost:3000/superheroes`).then(res => res.data)
}

const RQSuperHerosResult = () => {
    const { data, refetch, } = useQuery({
        queryKey: ['superHeroes'], queryFn: fetchSuperHero,
        enabled: false, // enabled is a boolean that determines if the query should be enabled default is true
    })
    return (
        <>
            <h2>RQ Super Heros page</h2>
            {/* check if the data was fetched if not display */}
            {!data ? <button type='button' onClick={() => {
                refetch()
            }}>Fetch Super Heros</button> : null}
            {data?.map(hero => {
                return <div key={hero.id}>{hero.name}</div>
            })}
        </>
    )
}
export default RQSuperHerosResult