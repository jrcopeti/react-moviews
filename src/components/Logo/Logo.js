import "./Logo.css";
import theater from "./theater.png";

export default function Logo() {
  return (
    <div className="logo">
     <img src={theater} alt="theater" />
      <h1>MOVIEWS</h1>
    </div>
  );
}
