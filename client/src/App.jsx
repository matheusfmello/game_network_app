import React, { useState } from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import AccountPage from "./components/account_page/AccountPage";
import LoginPage from "./components/login_page/LoginPage";
import GamePage from "./components/game_page/GamePage";
import GamesContainer from "./components/games_container/GamesContainer";
import ProtectedRoute from "./ProtectedRoute";
import Sidebar from "./components/sidebar/Sidebar";


function App() {

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const handleExpandSidebarButton = function() {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <h1>gamesConnection</h1>
          </header>
          <div className="App-body">
            <Sidebar
              className="sidebar"
              isSidebarExpanded={isSidebarExpanded}
              handleExpandSidebarButton={handleExpandSidebarButton}
            />
            <main className="app-content">
              <Routes>
                <Route path='/' element={<GamesContainer/>} />
                <Route path="/account" element={
                  <ProtectedRoute>
                    <AccountPage />
                  </ProtectedRoute>
                } />
                <Route path="/login" exact element={<LoginPage/>} />
                <Route path="/games/:gameId" element={<GamePage/>} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
  );
}

export default App;