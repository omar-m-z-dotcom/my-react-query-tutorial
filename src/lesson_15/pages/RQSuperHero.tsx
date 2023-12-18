import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useNavigate, useParams } from 'react-router-dom'
import RQSuperHeroResult from '../components/RQSuperHeroResult'
const RQSuperHero = () => {
    const navigate = useNavigate()
    const { heroID: heroIDString } = useParams();
    const heroID = Number(heroIDString);
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
                <RQSuperHeroResult heroID={heroID} />
            </Suspense>
        </ErrorBoundary>
    )
}
export default RQSuperHero