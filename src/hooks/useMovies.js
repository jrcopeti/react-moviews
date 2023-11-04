import { useState, useEffect } from "react";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      const abortRequest = new AbortController();
      const debounce = setTimeout(async function fetchMovies() {
        try {
          setIsLoading(true);
          setError(null);
          const res = await fetch(
            `https://omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`,
            { signal: abortRequest.signal }
          );
          if (!res.ok) {
            throw new Error("Something went wrong with fetching movies");
          }
          const data = await res.json();
          if (data.Response === "False") {
            throw new Error("Movie not found");
          }
          console.log(data);
          setMovies(data.Search);
        } catch (err) {
          console.error(err.message);
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }, 800);
      return () => {
        clearTimeout(debounce);
        abortRequest.abort();
      };
    },
    [query, callback]
  );
  return { movies, isLoading, error };
}
