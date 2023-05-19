import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import home from '../pages/home';
import About from '../pages/about';
import ErrorPage from '../pages/error';
import LiveSearch from '../components/LiveSearch.tsx';
import SearchPage from '../pages/search.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: home,
    ErrorBoundary: ErrorPage,
    children: [
      {
        path: '',
        Component: LiveSearch,
      },
      {
        path: '/about',
        Component: About,
      },
      {
        path: '/search/:keyword',
        Component: SearchPage,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
