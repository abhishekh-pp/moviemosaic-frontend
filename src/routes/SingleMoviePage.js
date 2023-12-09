import axios from "axios";
import React from "react";
import { useLoaderData } from "react-router-dom";
import styles from "./SingleMoviePage.module.css";
import { Link } from "react-router-dom";

export async function loader({ params }) {
  const res = await axios.get("http://localhost:3000/movie/" + params.movieId);
  const movie = res.data;
  return { movie };
}

function SingleMoviePage(props) {
  const { movie } = useLoaderData();
  console.log(movie);
  return (
    <main>
      <section className={styles.MovieDetailSection}>
        <div className={styles.Container}>
          <img
            className={styles.MovieImage}
            src={movie.image}
            alt={movie.image + "poster"}
          />
          <div className={styles.ContainerRight}>
            <h1>{movie.title}</h1>
            <span>{movie.language}</span>
            <span>{movie.category}</span>
            <Link
              className={styles.BookButton}
              to={"/select-show/" + movie._id}
            >
              Book Tickets
            </Link>
          </div>
        </div>
      </section>
      <section className={styles.AboutSection}>
        <div className={styles.Container}>
          <h1>About the Movie</h1>
          <span>{movie.description}</span>
        </div>
      </section>
      <section>
        <div className={styles.Container}>
          <h1>Cast</h1>
          <ul>
            <li></li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export default SingleMoviePage;
