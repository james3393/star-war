import { Dispatch, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { URI, Character } from "./film.dto";
import { getCharacters } from "./film.api";
import { Actions, State } from "./state";

function getCharacterId(uri: URI): string {
  const [, id] = uri.match(/people\/(\d*)\/?/) ?? [];
  return id;
}

function CharacterComponent({ uri, state }: { uri: URI; state: State }) {
  if (state.characters.state !== "loaded") {
    return null;
  }
  const character = state.characters.data[getCharacterId(uri)];
  if (!character) {
    // Maybe throw error.
    return null;
  }

  return (
    <>
      <Link to={`/characters/${getCharacterId(uri)}`}>{character.name}</Link>
      <br />
    </>
  );
}

export function FilmDetailPageComponent({
  state,
  dispatch
}: {
  state: State;
  dispatch: Dispatch<Actions>;
}) {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const asyncWrapper = async () => {
      if (state.films.state !== "loaded") {
        return null;
      }
      const film = state.films.data[id];

      dispatch({ type: "loading", payload: { type: "characters" } });
      (await getCharacters(film.characters)).match({
        Ok: (value) => {
          const characters: Record<string, Character> = {};
          value.forEach((character) => {
            characters[getCharacterId(character.url)] = character;
          });

          dispatch({
            type: "loaded",
            payload: { type: "characters", data: characters }
          });
        },
        Err: (error) =>
          dispatch({
            type: "loadError",
            payload: { type: "characters", reason: error }
          })
      });
    };

    asyncWrapper();
  }, [id, state.films, dispatch]);

  if (state.films.state !== "loaded") {
    return null;
  }
  const film = state.films.data[id];

  if (!film) {
    // TODO throw error.
    return null;
  }
  return (
    <article className="film">
      <h5>
        {film.title} <Link to={"/"}>Show Films</Link>
      </h5>
      <p>{film.opening_crawl}</p>
      <p>
        <label>episode# </label>
        {film.episode_id}
      </p>
      <p>
        <label>director: </label>
        {film.director}
      </p>
      <p>
        <label>producer: </label>
        {film.producer}
      </p>
      <p>
        <label>release date: </label>
        {film.release_date}
      </p>
      <p>
        <label>created: </label>
        {film.created}
      </p>
      <p>
        <label>edited: </label>
        {film.edited}
      </p>
      <div>
        <p>Characters: </p>
        {film.characters.map((uri) => (
          <CharacterComponent key={uri} uri={uri} state={state} />
        ))}
      </div>
    </article>
  );
}
