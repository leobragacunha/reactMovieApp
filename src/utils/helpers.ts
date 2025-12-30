import { getMovieGenres } from "@/services/API";

// DEPRECATED FOR NOW..
export async function generateGenresList() {
  const genresObject = await getMovieGenres();
  const genresList = genresObject
    .map((genre: { id: number; name: string }) => genre.name)
    .sort((a: string, b: string) => a.localeCompare(b));
  return genresList;
}
