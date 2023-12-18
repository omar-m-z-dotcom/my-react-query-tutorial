import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useNavigate } from 'react-router-dom'
import RQParallelQueriesResult from '../components/RQParallelQueries'

const RQParallelQueries = () => {
    const navigate = useNavigate()
    return (
        <ErrorBoundary
            fallbackRender={() => (
                <div>
                    There was an error!
                    <button type='button' onClick={() => {
                        navigate('/')
                    }}>back to home</button>
                </div>
            )}
        >
            <Suspense fallback={<div>Loading...</div>}>
                <RQParallelQueriesResult />
            </Suspense>
        </ErrorBoundary>
    )
}
export default RQParallelQueries