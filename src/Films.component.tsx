import { Dispatch, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Film, URI } from "./film.dto";
import { getFilms } from "./film.api";
import { State, Actions } from "./state";

function getFilmId(uri: URI): string {
  // TODO: Throw error
  const [, id] = uri.match(/films\/(\d*)\/?/) ?? [];
  return id;
}

function FilmComponent({ film }: { film: Film }) {
  return (
    <Link className="film" to={`/films/${getFilmId(film.url)}`}>
      {film.title}
    </Link>
  );
}

function FilmsComponent({ films }: { films: Film[] }) {
  return (
    <div className="films-list">
      {films.map((film) => (
        <FilmComponent key={film.url} film={film} />
      ))}
    </div>
  );
}

export function FilmsPageComponent({
  state,
  dispatch
}: {
  state: State;
  dispatch: Dispatch<Actions>;
}) {
  const [keyword, setKeyword] = useState("");

  // FUTURE: Add re-load etc.
  const [mode, setMode] = useState<"" | "search">("");

  useEffect(() => {
    const asyncWrapper = async () => {
      if (!mode) {
        return;
      }

      dispatch({ type: "loading", payload: { type: "films" } });
      (await getFilms()).match({
        Ok: (value) => {
          const films: Record<string, Film> = {};
          value.results.forEach((film) => {
            films[getFilmId(film.url)] = film;
          });

          dispatch({ type: "loaded", payload: { type: "films", data: films } });
        },
        Err: (error) =>
          dispatch({
            type: "loadError",
            payload: { type: "films", reason: error }
          })
      });
    };

    asyncWrapper();
  }, [mode, dispatch]);

  /**
   * films order is base on response for now.
   * FUTURE: Add sort base on something else like title or created.
   */
  let filteredFilms: Film[] = [];
  if (state.films.state === "loaded") {
    filteredFilms = Object.values(state.films.data).filter(
      (film) =>
        keyword === "" ||
        film.title.includes(keyword) ||
        film.opening_crawl.includes(keyword)
    );
  }

  return (
    <>
      <input
        type="text"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder={"search keyword here"}
      />
      <input
        type="button"
        disabled={state.films.state === "loading"}
        onClick={() => setMode("search")}
        value="Search Films"
      />
      {}
      {state.films.state === "loading" ? <p>Loading...</p> : null}
      {state.films.state === "loaded" ? (
        filteredFilms.length > 0 ? (
          <FilmsComponent films={filteredFilms} />
        ) : (
          <p>Nothing found, try to change keyword</p>
        )
      ) : null}
      {state.films.state === "loadError" ? <p>{state.films.reason}</p> : null}
    </>
  );
}
