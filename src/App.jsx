import Card from './components/Card';
import './styles/App.css';
import { createClient } from 'pexels';
import { useEffect, useState } from 'react';

const key = import.meta.env.VITE_API_KEY;
const client = createClient(key);

function MemoryCard() {
  const [photosObj, setPhotosObj] = useState([]);

  const query = 'animal';

  useEffect(() => {
    let isMount = true;

    client.photos.search({ query }).then((response) => {
      if (isMount) {
        console.log(response.photos);
        setPhotosObj(response.photos);
      }
    });

    return () => (isMount = false);
  }, []);

  return (
    <>
      <header>
        <div>
          <h1>Animals Memory Game</h1>
          <p>
            Get points by clicking on an image but don&#39;t click on any more
            than once!
          </p>
        </div>
      </header>
      <div className="cards">
        {photosObj.map((photo) => (
          <div className="card" key={photo.id}>
            <Card name={photo.alt} url={photo.src.medium} />
          </div>
        ))}
      </div>
    </>
  );
}

export default MemoryCard;
