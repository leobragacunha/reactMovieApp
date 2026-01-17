import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { useUserContext } from "@/contexts/UserContext";
import { NavLink, Link } from "react-router";
import { FaChevronCircleDown, FaUserCircle } from "react-icons/fa";
import ProfileDialog from "./ProfileDialog";
import { useState } from "react";

const NavBar = () => {
  const { isAuthenticated, signOut, user } = useUserContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // console.log("Auth: ", isAuthenticated);

  return (
    <>
      <nav className=" flex justify-between bg-linear-to-r from-violet-500 to-cyan-500 p-2 text-white h-14">
        <div className="flex items-center mx-4">
          <Link to="/">
            <img
              src="logo_white.png"
              alt="Logo"
              className="h-10  m-2 rounded-sm"
            />
          </Link>
          <NavLink to="/">
            <h1 className="italic">React Movie App</h1>
          </NavLink>
        </div>
        <div className="flex gap-4 space-evenly items-center mx-4">
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `${isActive ? "font-bold italic" : "text-white"}`
            }
          >
            All Movies
          </NavLink>
          <NavLink
            to="/my-movie-space"
            className={({ isActive }) =>
              `${isActive ? "font-bold italic" : "text-white"}`
            }
          >
            My Movie Space
          </NavLink>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 cursor-pointer h-full ">
                <div className="w-6 h-6 overflow-hidden rounded-full bg-gray-200 flex items-center justify-center ">
                  {user?.user_metadata?.photoPath!! ? (
                    <img
                      src={user?.user_metadata?.photoPath}
                      alt="Profile Picture"
                      className="object-cover w-full h-full rounded-full"
                    />
                  ) : (
                    <FaUserCircle size={24} />
                  )}
                </div>
                {user?.user_metadata?.fullName || user?.email}
                <FaChevronCircleDown />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className=" text-white border-t-2 border-t-white mt-2 py-2  w-(--radix-dropdown-menu-trigger-width) px-2 bg-cyan-500 rounded-b-md"
                align="start"
              >
                <DropdownMenuItem
                  className="hover:outline-none hover:bg-white hover:text-gray-700 hover:px-4 transition-all duration-300 cursor-pointer"
                  onClick={() => setIsDialogOpen(true)}
                >
                  Edit Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:outline-none hover:bg-white hover:text-gray-700 hover:px-2 transition-all duration-300 cursor-pointer"
                  onClick={signOut}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${isActive ? "font-bold italic" : "text-white"}`
              }
            >
              Login
            </NavLink>
          )}
        </div>
      </nav>

      <ProfileDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};

export default NavBar;
