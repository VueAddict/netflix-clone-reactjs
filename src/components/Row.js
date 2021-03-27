import React, { useState, useEffect } from "react";
import Youtube from "react-youtube";
import axios from "../api/axios";
import movieTrailer from "movie-trailer";
const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [found, setFound] = useState(true)
  const [trailerUrl, setTrailerUrl] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(fetchUrl);
        setMovies(res.data.results);
      } catch (error) {}
    };
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name || "").then((url) => {
        if(!url){
          setFound(false)
        } else {
          setFound(true)
          const URI = new URL(url)
        const urlParams = new URLSearchParams(URI.search);
        setTrailerUrl(urlParams.get("v"));
      }
      });
    }
  };
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            src={
              base_url + (isLargeRow ? movie.poster_path : movie.backdrop_path)
            }
            key={movie.id}
            alt={movie.name}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && found && <Youtube videoId={trailerUrl} opts={opts} />}
      {!found && <h1>No trailer found :(</h1> }
    </div>
  );
}

export default Row;
