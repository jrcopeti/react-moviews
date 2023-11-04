import calendar from "./calendar.png";
import noPhoto from "./no-photo.png";
export default function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      {movie.Poster === 'N/A' ? (<img className='poster' src={noPhoto} alt="poster not available"/>) : (<img className="poster" src={movie.Poster} alt={`${movie.Title} poster`} />) }
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <img className="calendar" src={calendar} alt="calendar" />
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
