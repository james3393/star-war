import { Character, Film } from "./film.dto";

interface InitState {
  state: "init";
}
interface LoadingState {
  state: "loading";
}
interface LoadedState<T> {
  state: "loaded";
  data: Record<string, T>;
}
interface LoadErrorState {
  state: "loadError";
  reason: string;
}
type FilmState = InitState | LoadingState | LoadedState<Film> | LoadErrorState;
type CharacterState =
  | InitState
  | LoadingState
  | LoadedState<Character>
  | LoadErrorState;

export interface State {
  films: FilmState;
  characters: CharacterState;
}

export interface LoadingAction {
  type: "loading";
  payload: {
    type: "films" | "characters";
  };
}

export interface LoadedAction {
  type: "loaded";
  payload: {
    type: "films" | "characters";
    data: Record<string, unknown>;
  };
}

export interface LoadErrorAction {
  type: "loadError";
  payload: {
    type: "films" | "characters";
    reason: string;
  };
}
export type Actions = LoadingAction | LoadedAction | LoadErrorAction;

export const initialState: State = {
  films: { state: "init" },
  characters: { state: "init" }
};
export function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        [action.payload.type]: { state: "loading" } // Maybe keep the old data.
      };
    case "loaded":
      return {
        ...state,
        [action.payload.type]: {
          state: "loaded",
          data: action.payload.data // Maybe keep the old data.
        }
      };
    case "loadError":
      return {
        ...state,
        [action.payload.type]: {
          state: "loadError",
          reason: action.payload.reason
        }
      };
    default:
      return state;
  }
}
