import useSelectedSuperHerosData from "../hooks/useSelectedSuperHerosData"

type Props = {
    selectedSuperHeros: number[]
}


const RQSelectedSuperHerosResult = ({ selectedSuperHeros: heroIDs }: Props) => {
    const queries = useSelectedSuperHerosData(heroIDs)
    return (
        <>
            <div>RQ Selected Super Heros</div>
            {queries.map((query) => {
                if (query.error) {
                    throw query.error
                }
                return (
                    <div key={query.data.id}>
                        {query.isFetching ? <div>checking for updates...</div> : null}
                        <div>{query.data.name} - {query.data.alterEgo}</div>
                    </div>
                )
            }
            )}
        </>
    )
}
export default RQSelectedSuperHerosResult