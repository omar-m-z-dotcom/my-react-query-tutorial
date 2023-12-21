import useSuperHeroData from '../hooks/useSuperHeroData';

type Props = {
    heroID: number
}
const RQSuperHerosResult = (props: Props) => {
    const { heroID } = props
    const { data: hero, error, isFetching, } = useSuperHeroData(heroID)
    if (error) {
        throw error
    }
    return (
        <>
            {isFetching ? <div>checking for updates...</div> : null}
            {<div key={hero.id}>{hero.name} - {hero.alterEgo}</div>}
        </>
    )
}
export default RQSuperHerosResult