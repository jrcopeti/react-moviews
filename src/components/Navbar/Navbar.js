import Logo from "../Logo/Logo";

export default function Navbar({children}) {
  return (
    <nav className="navbar">
      <Logo />
      {children}
    </nav>
  );
}
