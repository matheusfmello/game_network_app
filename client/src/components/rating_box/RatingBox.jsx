import React from 'react';
import './RatingBox.css';

const RatingBox = ({ gameName, scoreCategory, score }) => {
  const getBackgroundColor = (score) => {
    let red, green;
    const darken_factor = 0.7;

    if (score <= 50) {
      // Interpolate from red to yellow
      red = 255;
      green = Math.round((score / 50) * 255);
    } else {
      red = Math.round(255 - ((score - 50) / 50) * 255);
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
        backgroundColor: getBackgroundColor(score),
        padding: '5px 10px',
        borderRadius: '5px',
        color: 'white',
      }}
    >
      {score}
    </span>
    </div>
  );
};

export default RatingBox;