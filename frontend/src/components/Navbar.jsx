import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { LogOut, Users } from "lucide-react";
import apiClient from "../api/apiClient";
import { removeUser } from "../store/userSlice";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiClient.post("/auth/logout", {});
      dispatch(removeUser());
      navigate("/login");
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="font-semibold text-lg tracking-tight">
          {user ? "Dashboard" : "Visitor Tracking System"}
        </Link>

        {user && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Welcome, <span className="font-medium text-foreground">{user.username}</span>
            </span>
            <Separator orientation="vertical" className="h-6 hidden sm:block" />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar size="sm">
                    <AvatarImage
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      alt={user.username}
                    />
                    <AvatarFallback>
                      {user.username?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {user.role === "admin" && (
                  <DropdownMenuItem
                    render={
                      <Link to="/visitor/list" className="flex items-center gap-2">
                        <Users className="size-4" />
                        Visitors
                      </Link>
                    }
                  />
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="size-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
