import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, User } from "lucide-react";
import { FaCommentDots } from "react-icons/fa";
import { useThemeStore } from "../store/useThemeStore";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  const isDark = theme === "dark";

  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                {/* <MessageSquare className="w-5 h-5 text-primary" /> */}
                <FaCommentDots className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">ChatByte</h1>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <div className="flex items-center gap-2">
              <Sun className={`w-5 h-5 ${!isDark ? "text-yellow-500" : "text-base-content/40"}`} />
              <label className="cursor-pointer relative inline-flex items-center">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isDark}
                  onChange={toggleTheme}
                />
                <div className="w-12 h-6 bg-base-300 rounded-full peer peer-checked:bg-primary transition duration-300"></div>
                <div
                  className={`
                    absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all
                    peer-checked:translate-x-6
                  `}
                />
              </label>
              <Moon className={`w-5 h-5 ${isDark ? "text-purple-400" : "text-base-content/40"}`} />
            </div>

            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
