import WatchedMovie from "../WatchedMovie/WatchedMovie";
import "./WatchedMovieList.css";

export default function WatchedMovieList({ watched, onDeleteWatched, onSelectMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
}
