
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SharedLayout from './pages/SharedLayout';
import Home from './pages/Home';
import SuperHeroes from './pages/SuperHeroes';
import RQSuperHeroes from './pages/RQSuperHeroes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RQSuperHero from './pages/RQSuperHero';

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
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
    </QueryClientProvider>
  )
}

export default App
