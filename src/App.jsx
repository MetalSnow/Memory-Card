import Card from './components/Card';
import ScoreBoard from './components/ScoreBoard';
import './styles/App.css';
import { createClient } from 'pexels';
import { useEffect, useState } from 'react';

// Get key from .env file
const key = import.meta.env.VITE_API_KEY;
const client = createClient(key);

function MemoryCard() {
  const [photosArr, setPhotosArr] = useState([]);
  const [cardId, setCardId] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const query = 'animal';

  useEffect(() => {
    client.photos
      .search({ query })
      .then((data) => shuffle(data.photos))
      .then((shuffled) => {
        setPhotosArr(shuffled);
      });
  }, []);

  function handleClick(e) {
    const newPhotosObj = shuffle(photosArr);
    setPhotosArr(newPhotosObj);

    if (!cardId.includes(e.currentTarget.id)) {
      setCardId([...cardId, e.currentTarget.id]);
      setScore(score + 1);
    } else {
      setCardId([]);
      setBestScore(bestScore < score ? score : bestScore);
      setScore(0);
    }
  }

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
        <ScoreBoard score={score} bestScore={bestScore} />
      </header>
      <div className="cards">
        {photosArr.map((photo) => (
          <div
            className="card"
            key={photo.id}
            id={photo.id}
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
          >
            <Card name={photo.alt} url={photo.src.medium} />
          </div>
        ))}
      </div>
    </>
  );
}

function shuffle(array) {
  const newArray = array.slice();
  let currentIndex = array.length;

  // console.log(array);
  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ];
  }
  return newArray;
}

export default MemoryCard;
