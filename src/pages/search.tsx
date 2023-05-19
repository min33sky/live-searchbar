import { useParams } from 'react-router-dom';

export default function SearchPage() {
  const { keyword } = useParams();

  return <div>SearchPage : {keyword}</div>;
}
