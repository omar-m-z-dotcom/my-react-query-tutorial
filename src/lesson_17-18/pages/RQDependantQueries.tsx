import { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
const RQDependantQueriesResult = lazy(() => import("../components/RQDependantQueriesResult"));

const RQDependantQueries = () => {
    const navigate = useNavigate()
    return (
        <>
            <ErrorBoundary fallbackRender={() => (
                <div>
                    There was an error!
                    <button type='button' onClick={() => {
                        navigate('/')
                    }}>back to home</button>
                </div>
            )}>
                <Suspense fallback={<div>Loading...</div>}>
                    <RQDependantQueriesResult />
                </Suspense>
            </ErrorBoundary>
        </>
    )
}

export default RQDependantQueries