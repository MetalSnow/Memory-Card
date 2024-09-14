import Card from './components/Card';
import ScoreBoard from './components/ScoreBoard';
import './styles/App.css';
import { useEffect, useState } from 'react';

// Define API key and endpoint
const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = 'https://api.pexels.com/v1/search';

function MemoryCard() {
  const [photosArr, setPhotosArr] = useState([]);
  const [cardId, setCardId] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const query = 'animal';

  useEffect(() => {
    fetch(`${API_URL}?query=${query}&per_page=15&page=1`, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((response) => response.json())
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
