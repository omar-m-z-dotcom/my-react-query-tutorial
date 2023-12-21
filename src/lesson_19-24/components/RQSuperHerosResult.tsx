import useSuperHerosData, { useAddSuperHero } from '../hooks/useSuperHerosData';
import { Link } from 'react-router-dom';

const RQSuperHerosResult = () => {
    const { data, error, isFetching, } = useSuperHerosData()
    if (error) {
        throw error
    }

    const { mutate: heroMutation, error: heroPostError, isPending } = useAddSuperHero()

    const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const fomData = new FormData(e.currentTarget)
        const name = fomData.get('name')
        const alterEgo = fomData.get('alterEgo')
        if (name && alterEgo) {
            heroMutation({ name: name.toString(), alterEgo: alterEgo.toString() })
            // if (heroPostError) {
            //     throw heroPostError
            // }
        }
        else { console.log('no data') }
        e.currentTarget.reset()
    }
    return (
        <>
            <form onSubmit={handleClick}>
                <label htmlFor="name">name</label>
                <input id='name' type="text" name="name" />
                <label htmlFor="alterEgo">alterEgo</label>
                <input id="alterEgo" type="text" name="alterEgo" />
                <button type="submit">submit</button>
            </form>
            {isPending ? <div>adding hero...</div> : null}
            {heroPostError ? <div>{heroPostError.message}</div> : null}
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