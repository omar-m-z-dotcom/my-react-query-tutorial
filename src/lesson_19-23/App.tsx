
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lazy } from 'react';
import './App.css';
import SharedLayout from './pages/SharedLayout';
import Home from './pages/Home';
const SuperHeroes = lazy(() => import('./pages/SuperHeroes'));
const RQSuperHeroes = lazy(() => import('./pages/RQSuperHeroes'));
const RQSuperHero = lazy(() => import('./pages/RQSuperHero'));
const RQParallelQueries = lazy(() => import('./pages/RQParallelQueries'));
const RQSelectedSuperHeros = lazy(() => import('./pages/RQSelectedSuperHeros'));
const RQDependantQueries = lazy(() => import('./pages/RQDependantQueries'));
const RQPaginatedColor = lazy(() => import('./pages/RQPaginatedColor'));
const RQInfiniteColors = lazy(() => import('./pages/RQInfiniteColors'));


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SharedLayout />} >
              <Route key={1} index element={<Home />} />
              <Route key={2} path="super-heroes" element={<SuperHeroes />} />
              <Route key={3} path="rq-super-heroes">
                <Route key={1} index element={<RQSuperHeroes />} />
                <Route key={2} path=":heroID" element={<RQSuperHero />} />
              </Route>
              <Route key={4} path="rq-parallel-queries" element={<RQParallelQueries />} />
              <Route key={5} path="rq-selected-super-heroes" element={<RQSelectedSuperHeros />} />
              <Route key={6} path="rq-dependant-queries" element={<RQDependantQueries />} />
              <Route key={7} path="rq-paginated-color" element={<RQPaginatedColor />} />
              <Route key={8} path="rq-infinite-colors" element={<RQInfiniteColors />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
    </QueryClientProvider>
  )
}

export default App
