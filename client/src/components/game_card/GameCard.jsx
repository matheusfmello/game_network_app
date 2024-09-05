import React from "react";
import './GameCard.css'

const GameCard = ({game_doc}) => {
    return (
        <div className="game-card">
            <div className="game-card-title">
                <h3>{game_doc.title}</h3>    
            </div>
        <img src={`http://localhost:3333/images/${game_doc.image}`} alt={`${game_doc.title} cover`} />
        <p>{game_doc.description}</p>
        </div>
    );
};

export default GameCard;    