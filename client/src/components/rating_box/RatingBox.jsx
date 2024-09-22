import React, { useState, useEffect } from 'react';
import './RatingBox.css';

const RatingBox = ({ gameName, scoreCategory, score }) => {
  const [displayScore, setDisplayScore] = useState(score);

  useEffect(() => {
    setDisplayScore(score);
  }, [score]);
  const getBackgroundColor = (score) => {
    let red, green;
    const darken_factor = 0.7;

    if (displayScore <= 50) {
      // Interpolate from red to yellow
      red = 255;
      green = Math.round((displayScore / 50) * 255);
    } else {
      red = Math.round(255 - ((displayScore - 50) / 50) * 255);
      green = 255;
    }

    red = darken_factor * red;
    green = darken_factor * green;

    return `rgb(${red}, ${green}, 0)`;
  };

  return (
    <div className={`rating-box ${scoreCategory}`}>
    <p>{scoreCategory}</p>
    <span
      id={`${gameName}-${scoreCategory}`}
      style={{
        backgroundColor: getBackgroundColor(displayScore),
        padding: '5px 10px',
        borderRadius: '5px',
        color: 'white',
      }}
    >
      {displayScore}
    </span>
    </div>
  );
};

export default RatingBox;