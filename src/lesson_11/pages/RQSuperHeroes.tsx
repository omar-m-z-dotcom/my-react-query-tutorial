import { Suspense, } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import RQSuperHerosResult from '../components/RQSuperHerosResult'
import { useNavigate } from 'react-router-dom'
const RQSuperHeroes = () => {
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
                <RQSuperHerosResult />
            </Suspense>
        </ErrorBoundary>
    )
}

export default RQSuperHeroes