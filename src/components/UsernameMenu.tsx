import { useAuth0 } from "@auth0/auth0-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useUser } from "@/contexts/UserContext";

const UsernameMenu = () => {

    const { user, logout } = useAuth0();

    // current user
    const { currentUser } = useUser();


    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex item-center px-3 font-bold hover:text-orange-500 gap-2">
                <CircleUserRound className="text-orange-500" />
                {user?.email}
            </DropdownMenuTrigger>
            <DropdownMenuContent>

                { 

                /* show manage store link only when logged in user is admin */
                
                (currentUser && currentUser.userType == 'admin')

                ? (                 
                    <DropdownMenuItem>
                        <Link to="/manage-groceryStore" className="font-bold hover:text-orange-500 px-3 p-1 block">Manage Grocery Store</Link>
                    </DropdownMenuItem>
                )

                : null
                                
                }
                

                <DropdownMenuItem>
                    <Link to="/user-profile" className="font-bold hover:text-orange-500 px-3 p-1 block">User Profile</Link>
                </DropdownMenuItem>
                <Separator />
                
                <DropdownMenuItem>
                    <div className="px-2">
                       <Button className="flex flex-1 font-bold bg-orange-500 mt-3" onClick={() => logout()}>Log Out</Button>
                    </div>
                </DropdownMenuItem>
                
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UsernameMenu;
