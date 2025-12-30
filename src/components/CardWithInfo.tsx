import { Card, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { cn } from "@/lib/utils";
import { FaStar } from "react-icons/fa";
import { imageBaseURL } from "@/services/API";
import { Link } from "react-router";

const CardWithInfo = ({ movie, className }: any) => {
  return (
    <Link to={`/movie/${movie.id}`}>
      <Card
        className={cn(
          "text-white h-80 flex flex-col justify-between hover:scale-110 transition-transform duration-300",
          className
        )}
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${imageBaseURL}original${movie.poster_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <CardHeader>
          <CardTitle>{movie.title}</CardTitle>
        </CardHeader>

        <CardFooter>
          <p>{movie?.vote_average?.toFixed(1)}</p>
          <FaStar className="inline text-yellow-400 ml-1" />
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CardWithInfo;
