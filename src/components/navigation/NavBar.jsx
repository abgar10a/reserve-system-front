import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styles } from "./styles";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <header style={styles.header}>
      <nav style={styles.navLeft}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/events" style={styles.link}>Events</Link>
      </nav>

      <div style={styles.logo}>
        <Link to="/" style={styles.link}>
          <img
            src="public/bob.jpg"
            alt="logo"
            style={styles.logoIcon}
          /></Link>
      </div>

      <nav style={styles.navRight}>
        <Link to="/halls" style={styles.link}>Halls</Link>
        <Link to="/about" style={styles.link}>About</Link>
      </nav>
      {isLoggedIn ? (
        <div style={styles.profileSection}>
          <img
            src={user?.upload?.name}
            alt="Profile"
            style={styles.profilePicture}
          />
          <span>{user?.name}</span>
          <label style={styles.languageLabel}>EN</label>
        </div>
      ) : (
        <div style={styles.authLinks}>
          <Link to="/login">
            <button style={styles.button}>Login</button>
          </Link>
          <Link to="/register">
            <button style={styles.button}>Register</button>
          </Link>
        </div>
      )}
    </header>
  );
}