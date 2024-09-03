import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GamesContainer.css'
import GameCard from '../game_card/GameCard';

const GamesContainer = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get('http://localhost:3333/games');
                setGames(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchGames();
    }, []);

    console.log("games: ", games);

    return (
        <div className='games-container'>
            {games.map(game => (
                <GameCard key={game._id} game_doc={game}/>
            ))}
        </div>
    );
};


export default GamesContainer;