import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="jumbotron">
      <h1>Pluralsight Administration</h1>
      <p>REact, FLux, and React router for ultra-responsive web app</p>
      <Link to="/about" className="btn btn-primary">
        About page
      </Link>
    </div>
  );
}

export default HomePage;
