import {
    ComponentType,
    //  Suspense, lazy,
    // useEffects
    useState
} from "react";
import { ErrorBoundary } from "react-error-boundary";

// const RQPaginatedColorResult = lazy(() => import("../components/RQPaginatedColorResult"));

const RQPaginatedColor = () => {
    const [DynamicComponent, setDynamicComponent] = useState<ComponentType>();
    return (
        <>
            <h1>React Query Paginated Color page</h1>
            <ErrorBoundary fallbackRender={() => (
                <div>
                    There was an error!
                    <button type='button' onClick={() => {
                        import("react-router-dom").then((module) => {
                            const navigate = module.useNavigate()
                            navigate("/")
                        })
                    }}>back to home</button>
                </div>
            )}>
                {/* <Suspense fallback={<div>Loading...</div>}>
                    <RQPaginatedColorResult />
                </Suspense> */}
                {/* <MyComponent /> */}
                <button type='button' onClick={() => {
                    import('../components/RQPaginatedColorResult').then((module) => {
                        setDynamicComponent(() => module["default"]);
                    })
                }}>click me</button>
                {DynamicComponent ? <DynamicComponent /> : null}
            </ErrorBoundary>
        </>
    )
}

export default RQPaginatedColor

// function MyComponent() {
//     const [DynamicComponent, setDynamicComponent] = useState<FunctionComponent | null>(null);

//     useEffect(() => {
//         import('../components/RQPaginatedColorResult').then((Component) => {
//             setDynamicComponent(() => Component.default);
//         });
//     }, []);

//     if (!DynamicComponent) {
//         return <div>Loading...</div>; // You can return any loading state here
//     }

//     return <DynamicComponent />;
// }

// function MyComponent() {
//     const [DynamicComponent, setDynamicComponent] = useState<React.ComponentType>();

//     useEffect(() => {
//         import('../components/RQPaginatedColorResult').then((Component) => {
//             setDynamicComponent(() => Component.default);
//         });
//     }, []);

//     if (!DynamicComponent) {
//         return <div>Loading...</div>; // You can return any loading state here
//     }

//     return <DynamicComponent />;
// }