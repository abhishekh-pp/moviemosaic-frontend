import React from "react";
import styles from "./RootLayout.module.css";
import { Link, Outlet } from "react-router-dom";

function RootLayout(props) {
  return (
    <>
      <header className={styles.Header}>
        <h2>MovieMosaic</h2>
        <nav>
          <ul className={styles.NavList}>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <Link to={"/movies"}>Movies</Link>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="/signup">Sign up</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className={styles.Footer}>
        <span>Copyright 2023. </span>
        <span> Developed by Abhishekh</span>
      </footer>
    </>
  );
}

export default RootLayout;
