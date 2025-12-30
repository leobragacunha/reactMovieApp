import { getUpcomingMovies } from "@/services/API";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "./ui/spinner";
import { imageBaseURL } from "@/services/API";

const MainContent = () => {
  const {
    isPending,
    isError,
    data: mainMovie,
    error,
  } = useQuery({
    queryKey: ["mainMovie"],
    queryFn: getUpcomingMovies,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div>
        Error loading main content: {error ? error.message : "Unknown error"}
      </div>
    );
  }
  const backgroundImageURL = `${imageBaseURL}original${mainMovie.backdrop_path}`;
  // console.log(backgroundImageURL);

  return (
    <div
      className={`h-[70vh] bg-linear-to-b from-transparent flex-col text-white to-gray-700 flex justify-end`}
      // Tailwind does not accept variables in bg-image, so we use inline style
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1)), url(${backgroundImageURL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="mx-8 text-8xl">{mainMovie.original_title}</h1>
      <h2 className="mx-8 my-2 text-xl">{mainMovie.release_date}</h2>
    </div>
  );
};

export default MainContent;
