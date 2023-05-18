import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed left-0 top-0 w-full">
      <nav className="mx-auto w-full max-w-lg py-4">
        <ul className="flex space-x-6 text-xl font-bold ">
          <li className="transition hover:text-violet-300">
            <Link to="/">홈</Link>
          </li>
          <li className="transition hover:text-violet-300">
            <Link to="/about">소개</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
