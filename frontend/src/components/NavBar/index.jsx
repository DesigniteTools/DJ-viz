// Navbar component

import "./styles.css";

export default function NavBar() {
  return (
    <div className="navbar">
      <div className="logo">
        <a href="/">Smells Viz</a>
      </div>
      <div className="nav-links">
        <a href="/visualization">Visualization</a>
      </div>
    </div>
  );
}
