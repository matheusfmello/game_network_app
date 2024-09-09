import React, { useState } from "react";
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import './App.css';
import AccountPage from "./components/account_page/AccountPage";
import Header from "./components/header/Header";
import LoginPage from "./components/login_page/LoginPage";
import GamePage from "./components/game_page/GamePage";
import GamesContainer from "./components/games_container/GamesContainer";
import ProtectedRoute from "./ProtectedRoute";


function App() {

  return (
      <BrowserRouter>
        <div className="app">
          <header className="app-header">
            <Header/>
          </header>
          <div className="body">
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