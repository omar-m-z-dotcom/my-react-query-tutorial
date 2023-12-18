import { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
const RQDependantQueriesResult = lazy(() => import("../components/RQDependantQueriesResult"));

const RQDependantQueries = () => {
    return (
        <>
            <div>RQ Dependant Queries page</div>
            <ErrorBoundary fallbackRender={() => (
                <div>
                    There was an error!
                    <button type='button' onClick={() => {
                        import("react-router-dom").then((module) => {
                            const navigate = module["useNavigate"]()
                            navigate("/")
                        })
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