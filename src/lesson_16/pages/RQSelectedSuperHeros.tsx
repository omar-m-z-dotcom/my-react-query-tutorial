import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import RQSuperHerosForm from '../components/RQSuperHerosForm';

export const RQSelectedSuperHeros = () => {
    const navigate = useNavigate()

    return (
        <div>
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
                    <RQSuperHerosForm />
                </Suspense>
            </ErrorBoundary>
        </div>
    );
};
