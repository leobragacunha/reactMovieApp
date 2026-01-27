import { useUserContext } from "@/contexts/UserContext";

const MyMovieSpace = () => {
  const { user } = useUserContext();

  return (
    <div className="flex-1 flex bg-linear-to-r from-violet-500 to-cyan-500 py-8 px-8 text-white">
      <div className="flex-1 ">
        <h2 className="mb-4 text-2xl font-bold">Favourites</h2>
      </div>
      <div className="flex-1 ">
        <h2 className="mb-4 text-2xl font-bold">Your recent activity</h2>
      </div>
    </div>
  );
};

export default MyMovieSpace;
