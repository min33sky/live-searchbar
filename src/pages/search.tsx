import { Link, useLoaderData, useParams } from 'react-router-dom';

export default function SearchPage() {
  const loaderData = useLoaderData() as Profile;
  const { keyword } = useParams();

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <h1 className="text-xl font-bold">Search Result - {keyword}</h1>
      <p>{loaderData.name}</p>
      <p>{loaderData.email}</p>
      <p>{loaderData.address}</p>
      <Link
        to="/"
        className="rounded-lg bg-violet-800 px-3 py-2 transition hover:bg-violet-900"
      >
        Go Home
      </Link>
    </div>
  );
}
