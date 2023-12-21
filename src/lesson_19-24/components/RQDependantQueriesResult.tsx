import useDependantQueryData from "../hooks/useDependantQueryData"

const RQDependantQueriesResult = () => {
    const { user, channel } = useDependantQueryData("vishwas@example.com")

    return (
        <>
            <div>User: {user?.id}</div>
            <div>Channel courses: {channel?.courses.join(", ")}</div>
        </>)
}
export default RQDependantQueriesResult