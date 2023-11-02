import "./Logo.css";
import clapperboard from "./clapperboard.png";

export default function Logo() {
  return (
    <div className="logo">
     <img src={clapperboard} alt="clapperboard" />
      <h1>MOVIEWS</h1>
    </div>
  );
}
