import React from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import style from "./HomePage.module.css";

export async function loader() {
  const res = await axios.get("http://localhost:3000/movie");
  const data = res.data;
  return { data };
}

function HomePage(props) {
  const { data } = useLoaderData();
  console.log(data);

  return (
    <main>
      <section>
        <h2>Latest releases</h2>
        <ul className={style.MovieList}>
          {data.map((movie, index) => {
            return <MovieCard key={movie._id} movie={movie} />;
          })}
        </ul>
      </section>
    </main>
  );
}

export default HomePage;
