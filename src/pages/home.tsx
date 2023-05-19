import Footer from '../components/Footer';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

export default function home() {
  return (
    <main className="-mt-20 flex h-screen flex-col items-center justify-center text-white antialiased">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}
