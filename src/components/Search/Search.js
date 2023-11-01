import { useRef } from "react";
import { useKey } from "../../hooks/useKey";

export default function Search({ query, setQuery }) {
  const inputEl = useRef(null);
  console.log(inputEl);

  useKey("Enter", function () {
    console.log(inputEl.current);
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      ref={inputEl}
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
