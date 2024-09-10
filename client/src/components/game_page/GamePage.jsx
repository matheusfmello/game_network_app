import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import './GamePage.css'
import RatingBox from '../rating_box/RatingBox';

const ScoreSlider = ({ label, value, onChange }) => {
  const getSliderColor = (value) => {
    const green = Math.round((value / 100) * 255);
    const red = 255 - green;
    return `rgb(${red},${green},0)`;
  };

  return (
    <div className="score-slider">
      <label>{label}: {value}</label>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={onChange}
        style={{
          background: `linear-gradient(90deg, ${getSliderColor(value)} ${value}%, #ddd ${value}%)`
        }}
      />
    </div>
  );
};

const UserRatingField = ({ gameName, scoreCategory, score, label}) => {
  const [fieldScore, setFieldScore] = useState(score);

  return (
    <div className={`user-rating-field-${scoreCategory}`}>
      <RatingBox
        gameName={gameName}
        scoreCategory={scoreCategory}
        score={fieldScore}
      />
      <ScoreSlider
        label={label}
        value={fieldScore}
        onChange={(e) => {setFieldScore(e.target.value)}}
      />
    </div>
    
  )
}


const GamePage = () => {
  const {gameId} = useParams();  // Get game ID from URL
  const [game, setGame] = useState(null);
  const [userRatings, setUserRatings] = useState({'gameplay':50, 'difficulty':50, 'narrative':50})

  useEffect(() => {
    const fetchGlobalGameDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/games/${gameId}`);
        setGame(response.data);
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    };

    fetchGlobalGameDetails();
  }, [gameId]);

  useEffect(() => {
    const fetchUserGameDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/games/${gameId}/user`, {withCredentials:true});
        const user_ratings = response.data
        setUserRatings(user_ratings)
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    };

    fetchUserGameDetails();
  }, [gameId]);


  if (!game || !userRatings) return <p>Loading...</p>;


  return (
    <div className="game-details">
      <h2>{game.title}</h2>
      <img src={`http://localhost:3333/images/${game.image}`} alt={`${game.title} cover`} />
      <p>{game.description}</p>
      <p>Producer: {game.producer}</p>
      <p>Year: {game.year}</p>

      <h3>Average Ratings</h3>
      <div className="global-ratings-container">
        
        <RatingBox
          gameName={game.title}
          scoreCategory={"gameplay"}
          score={game.averageGameplay}
        />
        <RatingBox
          gameName={game.title}
          scoreCategory={"difficulty"}
          score={game.averageDifficulty}
        />
        <RatingBox
          gameName={game.title}
          scoreCategory={"narrative"}
          score={game.averageNarrative}
        />
      </div>
      <h3>Rate this Game</h3>
      <div className='user-ratings-container'>
        <UserRatingField
          gameName={game.title}
          scoreCategory={"gameplay"}
          score={userRatings.gameplay}
          label={"Gameplay"}
        />
        <UserRatingField
          gameName={game.title}
          scoreCategory={"difficulty"}
          score={userRatings.gameplay}
          label={"Difficulty"}
        />
        <UserRatingField
          gameName={game.title}
          scoreCategory={"narrative"}
          score={userRatings.narrative}
          label={"Narrative"}
        />
      </div>
      
    </div>
  );
};

export default GamePage;