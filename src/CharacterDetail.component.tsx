import { useParams, Link, useHistory } from "react-router-dom";
import { State } from "./state";

export function CharacterDetailPageComponent({ state }: { state: State }) {
  const { id } = useParams<{ id: string }>();
  const hostory = useHistory();

  if (state.characters.state !== "loaded") {
    return null;
  }
  const character = state.characters.data[id];

  if (!character) {
    // Maybe throw error.
    return null;
  }

  return (
    <div>
      <Link to={"/"}>Home</Link>
      <p>
        <label>name: </label>
        {character.name}
      </p>
      <p>
        <label>gender: </label>
        {character.gender}
      </p>
      <p>
        <label>height: </label>
        {character.height}
      </p>
      <p>
        <label>mass: </label>
        {character.mass}
      </p>
      <p>
        <label>birth year: </label>
        {character.birth_year}
      </p>
      <p>
        <label>hair color: </label>
        {character.hair_color}
      </p>
      <p>
        <label>skin color: </label>
        {character.skin_color}
      </p>
      <p>
        <label>eye color: </label>
        {character.eye_color}
      </p>
      <button onClick={() => hostory.goBack()}>Go Back</button>
      {/** More fields here */}
    </div>
  );
}
