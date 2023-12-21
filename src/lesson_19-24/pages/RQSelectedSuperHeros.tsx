import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import RQSuperHerosForm from '../components/RQSuperHerosForm';

const RQSelectedSuperHeros = () => {
    return (
        <div>
            <h2>RQ Selected Super Heros page</h2>
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
                    <RQSuperHerosForm />
                </Suspense>
            </ErrorBoundary>
        </div>
    );
};

export default RQSelectedSuperHeros;
