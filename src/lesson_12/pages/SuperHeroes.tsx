import { useState, useEffect } from 'react'
import axios from 'axios'
import superHero from '../models/superHero'

const SuperHeroes = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [data, setData] = useState<superHero[]>([])

    useEffect(() => {
        axios.get<superHero[]>('http://localhost:3000/superheroes').then(res => {
            setData(res.data)
            setIsLoading(false)
        })
    }, [])

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    return (
        <>
            <h2>Super Heroes Page</h2>
            {data.map(hero => {
                return <div key={hero.id}>{hero.name}</div>
            })}
        </>
    )
}

export default SuperHeroes