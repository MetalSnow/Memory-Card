import { createClient } from 'pexels';
import { useEffect, useState } from 'react';

const key = import.meta.env.VITE_API_KEY;

const client = createClient(key);
const query = 'Cartoon';

export default function Card() {
  const [photoUrl, setPhotoUrl] = useState({});

  useEffect(() => {
    client.photos.search({ query }).then((response) => {
      response.photos[0].src.medium;
      setPhotoUrl(response.photos[0].src.medium);
    });
  }, []);

  return (
    <div className="card">
      <img src={photoUrl} alt="art" />
      <span></span>
    </div>
  );
}
