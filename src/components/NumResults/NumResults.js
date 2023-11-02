import "./NumResults.css";

export default function NumResults({movies}) {
  return (
    <p className="num-results">
      Found {movies.length} results
    </p>
  );
}
