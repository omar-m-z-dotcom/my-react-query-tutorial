import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import RQParallelQueriesResult from '../components/RQParallelQueries'

const RQParallelQueries = () => {
    return (
        <>
            <h2>RQ Parallel Queries</h2>
            <ErrorBoundary
                fallbackRender={() => (
                    <div>
                        There was an error!
                        <button type='button' onClick={() => {
                            import("react-router-dom").then((module) => {
                                const navigate = module.useNavigate()
                                navigate("/")
                            })
                        }}>back to home</button>
                    </div>
                )}
            >
                <Suspense fallback={<div>Loading...</div>}>
                    <RQParallelQueriesResult />
                </Suspense>
            </ErrorBoundary>
        </>
    )
}
export default RQParallelQueries