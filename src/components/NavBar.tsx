import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { NavLink } from "react-router";

const NavBar = () => {
  return (
    <nav className=" flex justify-between bg-linear-to-r from-violet-500 to-cyan-500 p-2 text-white">
      <div className="flex items-center mx-4">
        <img src="logo_white.png" alt="Logo" className="h-10  m-2 rounded-sm" />
        <NavLink to="/">
          <h1 className="italic">React Movie App</h1>
        </NavLink>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          <div className="flex gap-4 space-evenly mx-4">
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                `${isActive ? "font-bold italic" : "text-white"}`
              }
            >
              <NavigationMenuLink asChild>
                <NavigationMenuItem>All Movies</NavigationMenuItem>
              </NavigationMenuLink>
            </NavLink>
            <NavLink
              to="/my-movie-space"
              className={({ isActive }) =>
                `${isActive ? "font-bold italic" : "text-white"}`
              }
            >
              <NavigationMenuLink asChild>
                <NavigationMenuItem>My Movie Space</NavigationMenuItem>
              </NavigationMenuLink>
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${isActive ? "font-bold italic" : "text-white"}`
              }
            >
              <NavigationMenuLink asChild>
                <NavigationMenuItem>Login</NavigationMenuItem>
              </NavigationMenuLink>
            </NavLink>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default NavBar;
