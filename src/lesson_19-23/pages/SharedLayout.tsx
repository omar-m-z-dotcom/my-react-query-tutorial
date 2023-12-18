import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { Suspense } from 'react';


const SharedLayout = () => {
    return (
        <>
            <NavBar />
            <Suspense fallback={<div>Loading...</div>}>
                <Outlet />
            </Suspense>
        </>
    );
}
export default SharedLayout