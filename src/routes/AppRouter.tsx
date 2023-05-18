import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import home from '../pages/home';
import About from '../pages/about';
import ErrorPage from '../pages/error';
import LiveSearch from "../components/LiveSearch.tsx";

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
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
