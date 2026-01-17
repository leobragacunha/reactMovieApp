import type { ApiError } from "@/types/api";
import type { Movie, MoviesResponse } from "@/types/movies";
import type { Genre, GenreListResponse } from "@/types/genres";
import type { MovieDetail } from "@/types/movieDetail";

// URLS
export const imageBaseURL = "https://image.tmdb.org/t/p/";

const urlTrending =
  "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
const urlUpcoming =
  "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
const urlGenres = "https://api.themoviedb.org/3/genre/movie/list?language=en";
const urlMoviesByGenrePart1 =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=";
const urlMoviesByGenrePart2 = "&sort_by=popularity.desc&with_genres=";
const urlMovieById = "https://api.themoviedb.org/3/movie/";

const apiKey = import.meta.env.VITE_API_KEY;
const accessToken = import.meta.env.VITE_API_ACCESS_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
};

// Grab the first upcoming movie to display in MainContent component
export async function getUpcomingMovies(): Promise<Movie> {
  try {
    const response = await fetch(urlUpcoming, options);

    if (!response.ok) {
      const error: ApiError = new Error(
        `HTTP error! Status: ${response.status} `
      );
      throw error;
    }

    //We only need the first result
    const data: MoviesResponse = await response.json();

    const upcomingMovie = data.results[0];
    return upcomingMovie;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Unknown error while fetching movies!");
  }
}

// Grab the trending movies for TrendingMovies component
export async function getTrendingMovies(): Promise<MoviesResponse> {
  try {
    const response = await fetch(urlTrending, options);

    if (!response.ok) {
      const error: ApiError = new Error(
        `Http Error! Status: ${response.status}`
      );
      throw error;
    }

    const data: MoviesResponse = await response.json();

    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching trending movies:", error);

    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unknown error while fetching movies!");
  }
}

// Grab the movie genres for different uses
export async function getMovieGenres(): Promise<Genre[]> {
  try {
    const response = await fetch(urlGenres, options);

    if (!response.ok) {
      const error: ApiError = new Error(
        `HTTP error! Status: ${response.status}`
      );
      error.status = response.status;
      throw error;
    }

    const data = (await response.json()) as GenreListResponse;
    return data.genres;
  } catch (error) {
    console.error("Error fetching movie genres:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unknown error while fetching genres!");
  }
}

// Grab movies by genre
export async function getMoviesByGenre(
  genreID: number,
  pageNumber: number = 1
): Promise<MoviesResponse> {
  try {
    const response = await fetch(
      `${urlMoviesByGenrePart1}${pageNumber}${urlMoviesByGenrePart2}${genreID}`,
      options
    );

    if (!response.ok) {
      const error: ApiError = new Error(
        `Http error! Status: ${response.status}`
      );
      throw error;
    }

    const data: MoviesResponse = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unknown error while fetching movies!");
  }
}

export async function getMovieById(id: string): Promise<MovieDetail> {
  try {
    const response = await fetch(
      `${urlMovieById}${id}?language=en-US'`,
      options
    );

    if (!response.ok) {
      const error: ApiError = new Error(
        `Http Error! Status: ${response.status}`
      );
      throw error;
    }

    const data: MovieDetail = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie by id:", error);

    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unknown error while fetching movie details!");
  }
}
