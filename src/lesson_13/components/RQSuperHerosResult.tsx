import useSuperHeroData from '../hooks/useSuperHeroData';

const RQSuperHerosResult = () => {
    const { data, refetch, isError, error, isFetching } = useSuperHeroData()
    if (isError) {
        throw error
    }
    return (
        <>
            <h2>RQ Super Heros page</h2>
            {<button type='button' onClick={() => {
                refetch()
            }}>Fetch Super Heros</button>}
            {isFetching ? <div>checking for updates...</div> : null}
            {data?.map(hero => {
                return <div key={hero.id}>{hero.name}</div>
            })}
        </>
    )
}
export default RQSuperHerosResult