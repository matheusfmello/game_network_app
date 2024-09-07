import React from "react";
import {Link} from "react-router-dom";
import './GameCard.css';
import RatingBox from "../rating_box/RatingBox";


const GameCard = ({game_doc}) => {
    return (
        <Link to={`/games/${game_doc._id}`} className="game-card-link">
            <div className="game-card">
                <div className="game-card-title">
                    <h3>{game_doc.title}</h3>    
                </div>
                <div className="game-card-info">
                    <img src={`http://localhost:3333/images/${game_doc.image}`} alt={`${game_doc.title} cover`} />
                    <p>{game_doc.description}</p>
                </div>
                <div className="game-card-ratings">
                    <RatingBox
                        gameName={game_doc.title}
                        scoreCategory="gameplay"
                        score={game_doc.averageGameplay}
                    />
                    <RatingBox
                        gameName={game_doc.title}
                        scoreCategory="difficulty"
                        score={game_doc.averageDifficulty}
                    />
                    <RatingBox
                        gameName={game_doc.title}
                        scoreCategory="gameplay"
                        score={game_doc.averageNarrative}
                    />
                </div>
            </div>
        </Link>
    );
};

export default GameCard;    