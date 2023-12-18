import useSuperHerosData from '../hooks/useSuperHerosData';
import { Link } from 'react-router-dom';

const RQSuperHerosResult = () => {
    const { data, error, isFetching, } = useSuperHerosData()
    if (error) {
        throw error
    }
    return (
        <>
            {isFetching ? <div>checking for updates...</div> : null}
            {data.map(hero => {
                return (
                    <div key={hero.id}>
                        <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
                    </div>
                )
            })}
        </>
    )
}
export default RQSuperHerosResult