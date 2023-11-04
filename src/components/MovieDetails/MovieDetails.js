import { useEffect, useState } from "react";
import StarRating from "../StarRating/StarRating";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useKey } from "../../hooks/useKey";
import "./MovieDetails.css";

export default function MovieDetails({
  selectedId,
  onCloseMovieDetails,
  onAddWatched,
  onUpdateWatchedMovie,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [error, setError] = useState("");
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  console.log(isWatched);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    Writer: writer,
    Language: language,
    Country: country,
  } = movie;
  console.log(movie);

  function handleAddMovie() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovieDetails();
  }

  function handleUpdateRating() {
    const updatedMovie = {
      ...watched.find((movie) => movie.imdbID === selectedId),
      userRating,
    };
    onUpdateWatchedMovie(updatedMovie);
    onCloseMovieDetails();
  }

  useKey("Escape", onCloseMovieDetails);

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${selectedId}`
          );
          if (!res.ok) {
            throw new Error("Something went wrong");
          }
          const data = await res.json();
          setMovie(data);
        } catch (err) {
          console.error(err.message);
          setError("Unable to get movie details");
        } finally {
          setIsLoading(false);
        }
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `${title}`;

      return function () {
        document.title = "Moviews";
      };
    },
    [title]
  );

  useEffect(() => {
    function handleResize() {
      setScreenSize(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function starSize() {
    if (screenSize <= 390) {
      return 20;
    } else if (screenSize > 390 && screenSize <= 480) {
      return 24;
    } else if (screenSize > 480 && screenSize <= 850) {
      return 28;
    } else if (screenSize > 850 && screenSize <= 1285) {
      return 40;
    } else if (screenSize > 1285) {
      return 45;
    }
  }
  console.log(starSize());

  return (
    <div className="details">
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovieDetails}>
              &larr;
            </button>
            {movie.Poster === "N/A" ? (
              ""
            ) : (
              <img className="poster" src={poster} alt={`Poster of ${movie}`} />
            )}
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDB Rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              <>
                <StarRating
                  maxRating={10}
                  size={starSize()}
                  onSetRating={setUserRating}
                  fontFamily="Alata"
                />
                {!isWatched && userRating >= 0 && (
                  <button className="btn-add" onClick={handleAddMovie}>
                    + Add to list
                  </button>
                )}
                {isWatched && (
                  <button className="btn-add" onClick={handleUpdateRating}>
                    Update rating
                  </button>
                )}
              </>
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
            <p>Written by {writer}</p>
            <p>Language: {language}</p>
            <p>Country: {country}</p>
          </section>
        </>
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}
