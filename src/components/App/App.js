import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import NumResults from "../NumResults/NumResults";
import Search from "../Search/Search";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState([]);
  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
        </Navbar>

    </>
  );
}
