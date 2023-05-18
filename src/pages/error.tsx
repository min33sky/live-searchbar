import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4 text-white">
      <p className="text-lg font-bold">잘못된 접근입니다.</p>
      <Link
        to="/"
        className="rounded-md bg-violet-800 px-5 py-3 text-white transition hover:bg-violet-900"
      >
        홈으로
      </Link>
    </div>
  );
}
