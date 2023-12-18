import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useParams } from 'react-router-dom'
import RQSuperHeroResult from '../components/RQSuperHeroResult'
const RQSuperHero = () => {
    const { heroID: heroIDString } = useParams();
    const heroID = Number(heroIDString);
    return (
        <>
            <h2>RQ Super Hero details</h2>
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
                    <RQSuperHeroResult heroID={heroID} />
                </Suspense>
            </ErrorBoundary>
        </>
    )
}
export default RQSuperHero