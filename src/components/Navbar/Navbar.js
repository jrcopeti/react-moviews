import Logo from "../Logo/Logo";
import "./Navbar.css";

export default function Navbar({children}) {
  return (
    <nav className="navbar">
      <Logo />
      {children}
    </nav>
  );
}
