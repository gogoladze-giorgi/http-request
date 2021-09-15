import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [moves, setMoves] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const FetchApiHandler = () => {
    setIsLoading(true);
    fetch("https://swapi.dev/api/films/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const moveTransFormed = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMoves(moveTransFormed);
        setIsLoading(false);
      });
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={FetchApiHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={moves} />}

        {!isLoading && moves.length === 0 && (
          <p style={{ color: "red" }}>found no movies</p>
        )}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
