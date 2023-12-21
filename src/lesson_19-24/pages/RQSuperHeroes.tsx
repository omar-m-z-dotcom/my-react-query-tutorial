import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import RQSuperHerosResult from '../components/RQSuperHerosResult'
const RQSuperHeroes = () => {
    return (
        <>
            <h2>RQ Super Heros page</h2>
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
                    <RQSuperHerosResult />
                </Suspense>
            </ErrorBoundary>
        </>
    )
}

export default RQSuperHeroes