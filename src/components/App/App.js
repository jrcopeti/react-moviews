import { useCallback, useState } from "react";
import { useMovies } from "../../hooks/useMovies";
import { useLocalStorageState } from "../../hooks/useLocalStorage";
import Navbar from "../Navbar/Navbar";
import NumResults from "../NumResults/NumResults";
import Search from "../Search/Search";
import Main from "../Main/Main";
import Box from "../Box/Box";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieList from "../MovieList/MovieList";
import MovieDetails from "../MovieDetails/MovieDetails";
import WatchedSummary from "../WatchedSummary/WatchedSummary";
import WatchedMovieList from "../WatchedMovieList/WatchedMovieList";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  const handleCloseMovieDetails = useCallback(() => setSelectedId(null), []);
  const { movies, isLoading, error } = useMovies(
    query,
    handleCloseMovieDetails
  );

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function updateWatchedMovie(updatedMovie) {
    setWatched((watched) =>
      watched.map((movie) =>
        movie.imdbID === updatedMovie.imdbID ? updatedMovie : movie
      )
    );
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        {movies.length > 0 ? <NumResults movies={movies}/> : <p className="num-results">Make your movie list</p>}
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovieDetails={handleCloseMovieDetails}
              onAddWatched={handleAddWatched}
              watched={watched}
              onUpdateWatchedMovie={updateWatchedMovie}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
                onSelectMovie={handleSelectMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
