import type { Genre } from "./genres";
import type { Movie } from "./movies";

export interface MovieDetail extends Movie {
  genres: Genre[];
  belongs_to_collection?: {
    backdrop_path: string;
    id: number;
    name: string;
    poster_path: string;
  };
  budget: number;
  homepage: string;
  imdb_id: string;
  origin_country: string[];
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_country: {
    iso_3166_1: string;
    name: string;
  }[];
  revenue: number;
  runtime: number;
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
}
