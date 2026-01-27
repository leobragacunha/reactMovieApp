import { getMovieGenres } from "@/services/API";

// DEPRECATED FOR NOW..
export async function generateGenresList() {
  const genresObject = await getMovieGenres();
  const genresList = genresObject
    .map((genre: { id: number; name: string }) => genre.name)
    .sort((a: string, b: string) => a.localeCompare(b));
  return genresList;
}

export function convertTimeStampToDateString(timestamp: string) {
  const date = new Date(timestamp);

  const today = new Date();
  if (today.toLocaleDateString() === date.toLocaleDateString()) return "Today";

  const yesterday = new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000);
  if (yesterday.toLocaleDateString() === date.toLocaleDateString())
    return "Yesterday";

  const dateTimeString = `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;

  return dateTimeString;
}
