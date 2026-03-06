function Navbar({ count }) {
  return (
    <nav className="navbar">
      <h1>Gestion des utilisateurs</h1>
      <p>{count} utilisateur(s)</p>
    </nav>
  );
}

export default Navbar;
