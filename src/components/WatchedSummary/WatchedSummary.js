import "./WatchedSummary.css";
import videoplayer from './video-player.png'
import star from '../WatchedMovie/star.png'
import clock from '../WatchedMovie/wall-clock.png'

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
        <img className="icon" src={videoplayer} alt="videoplayer" />

          <span alt="movies watched">{watched.length}</span>
        </p>
        <p>
          <img className="icon-star" src={star} alt="star" />
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p>
          <img className="icon" src={clock} alt="clock" />
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}
