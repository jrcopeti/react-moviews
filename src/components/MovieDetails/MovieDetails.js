import { useEffect, useState } from "react";
import StarRating from "../StarRating/StarRating";
import Loader from "../Loader/Loader";
import { useKey } from "../../hooks/useKey";

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

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  console.log(isWatched);

  // const isDisabled = isWatched || userRating === "";

  // const watchedUserRating =
  //   watched.find((movie) => movie.imdbID === selectedId)?.userRating || "";

  // useEffect(() => {
  //   setUserRating(watchedUserRating);
  // }, [watchedUserRating]);

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
      ...watched.find(movie => movie.imdbID === selectedId),
      userRating
    };
    onUpdateWatchedMovie(updatedMovie);
    onCloseMovieDetails();
  }

  useKey("Escape", onCloseMovieDetails);

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
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

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovieDetails}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie}`} />
            <div className={"details-overview"}>
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>IMDb rating
              </p>
            </div>
            {selectedId}
          </header>

          <section>
            <div className="rating">
              <>
                <StarRating
                  maxRating={10}
                  size={24}
                  onSetRating={setUserRating}
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
    </div>
  );
}
