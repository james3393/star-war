export interface Films {
  count: number;
  next: number | null;
  previous: number | null;
  results: Film[];
}

type DateOnly = string;
type ISODate = string;
export type URI = string;

export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: DateOnly;
  characters: URI[];
  planets: URI[];
  starships: URI[];
  vehicles: URI[];
  species: URI[];
  created: ISODate;
  edited: ISODate;
  url: URI;
}

type BirthYear = string;
type Gender = string;
export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: BirthYear;
  gender: Gender;
  homeworld: URI;
  films: URI[];
  species: URI[];
  vehicles: URI[];
  starships: URI[];
  created: ISODate;
  edited: ISODate;
  url: URI;
}
