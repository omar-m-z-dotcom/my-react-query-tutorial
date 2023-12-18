
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SharedLayout from './pages/SharedLayout';
import Home from './pages/Home';
import SuperHeroes from './pages/SuperHeroes';
import RQSuperHeroes from './pages/RQSuperHeroes';
import RQSuperHero from './pages/RQSuperHero';
import RQParallelQueries from './pages/RQParallelQueries';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RQSelectedSuperHeros from './pages/RQSelectedSuperHeros';
import RQDependantQueries from './pages/RQDependantQueries';

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
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
    </QueryClientProvider>
  )
}

export default App
