import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import RQInfiniteColorsResult from '../components/RQInfiniteColorsResult'

const RQInfiniteColors = () => {
    return (
        <>
            <h2>RQ Infinite Colors</h2>
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
                    <RQInfiniteColorsResult />
                </Suspense>
            </ErrorBoundary>
        </>
    )
}

export default RQInfiniteColors