import { useState } from "react";
import "./Box.css";

export default function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "Hide" : "Show"}
      </button>
      {isOpen && children}
    </div>
  );
}
