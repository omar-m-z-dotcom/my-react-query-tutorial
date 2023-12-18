import useFriendsData from "../hooks/useFriendsData"
import useSuperHerosData from "../hooks/useSuperHerosData"

const RQParallelQueriesResult = () => {
    const { data: friends, error: friendsError, isFetching: isFetchingFriends } = useFriendsData()
    const { data: heros, error: herosError, isFetching: isFetchingHeros } = useSuperHerosData()
    if (friendsError) {
        throw friendsError
    }
    if (herosError) {
        throw herosError
    }
    return (
        <>
            <h2>RQ Parallel Queries</h2>
            {isFetchingFriends || isFetchingHeros ? <div>checking for updates...</div> : null}
            {friends?.map(friend => <div key={friend.id}>{friend.name}</div>)}
            {heros?.map(hero => <div key={hero.id}>{hero.name} - {hero.alterEgo}</div>)}
        </>
    )
}
export default RQParallelQueriesResult