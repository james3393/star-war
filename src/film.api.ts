import axios from "axios";
import { Result } from "true-myth";

import { Films, URI, Character } from "./film.dto";

export async function getFilms(): Promise<Result<Films, string>> {
  try {
    const { data } = await axios({ url: `https://swapi.dev/api/films` });
    return Result.ok(data);
  } catch (e) {
    return Result.err(e.message || "Oops, failed to get films.");
  }
}

export async function getCharacters(
  uris: URI[]
): Promise<Result<Character[], string>> {
  try {
    const characters = await Promise.all(
      uris.map((uri) => axios({ url: uri }).then((res) => res.data))
    );
    return Result.ok(characters);
  } catch (e) {
    return Result.err(e.message || "Oops, failed to get characters.");
  }
}
