
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SharedLayout from './lesson_13/pages/SharedLayout';
import Home from './lesson_13/pages/Home';
import SuperHeroes from './lesson_13/pages/SuperHeroes';
import RQSuperHeroes from './lesson_13/pages/RQSuperHeroes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
              <Route key={3} path="rq-super-heroes" element={<RQSuperHeroes />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
    </QueryClientProvider>
  )
}

export default App
