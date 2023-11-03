import star from "./star.png";
import clock from "./wall-clock.png";
import "./WatchedMovie.css";
export default function WatchedMovie({
  movie,
  onDeleteWatched,
  onSelectMovie,
}) {
  return (
    <li>
      <img
        className="poster"
        src={movie.poster}
        alt={`${movie.Title} poster`}
        onClick={() => onSelectMovie(movie.imdbID)}
      />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <img className="icon-star" src={star} alt="star" />
          <span>{movie.userRating}</span>
        </p>
        <p>
          <img className="icon" src={clock} alt="clock" />

          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
