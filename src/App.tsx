import { Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserContextProvider } from "./contexts/UserContext";

import StdLayout from "./layouts/StdLAyout";
import Home from "./pages/Home";
import AllMovies from "./pages/AllMovies";
import AllMoviesFromGenre from "./pages/AllMoviesFromGenre";
import MyMovieSpace from "./pages/MyMovieSpace";
import Login from "./pages/Login";
import MovieDetail from "./pages/MovieDetail";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <Routes>
          <Route element={<StdLayout />}>
            <Route index element={<Home />} />
            <Route path="/movies" element={<AllMovies />} />
            <Route path="/movies/:genreId" element={<AllMoviesFromGenre />} />
            <Route path="/movie/:movieId" element={<MovieDetail />} />
            <Route path="/my-movie-space" element={<MyMovieSpace />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
