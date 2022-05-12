import React from "react";

// Styles
import "./style.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <a href="/" className="logo">
          FootballDB
        </a>
        
        <a href="/leagues" className="logo">
          Leagues
        </a>

        <a href="/managers" className="logo">
          Managers
        </a>

        <a href="/clubs" className="logo">
          Clubs
        </a>

        <a href="/players" className="logo">
          Players
        </a>

        <a href="/goalkeepers" className="logo">
          Goalkeepers
        </a>

        <a href="/countries" className="logo">
          Countries
        </a>

        <a href="/stadiums" className="logo">
          Stadiums
        </a>
      </div>
      
    </header>
  );
};

export default Header;
