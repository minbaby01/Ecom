import { House, LogOut, Menu, ShoppingCart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWarpper from "./cart-warpper";
import { useEffect, useState } from "react";
import { getCart } from "@/store/shop/carts-slice";
import { Label } from "../ui/label";

function MenuItems() {
    const navigate = useNavigate();
    function handleNavigate(getCurrentMenuItem) {
        if (getCurrentMenuItem.id === 'listing') {
            sessionStorage.removeItem('filters');
        }

        navigate(getCurrentMenuItem.path);
    }

    return <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
        {
            shoppingViewHeaderMenuItems.map(menuItem =>
                <Label key={menuItem.id} onClick={() => handleNavigate(menuItem)}
                    className="text-sm font-medium cursor-pointer">
                    {menuItem.label}
                </Label>
            )
        }
    </nav>
}

function HeaderRightContent() {
    const { user } = useSelector(state => state.auth);
    const { cartItems } = useSelector(state => state.shoppingCarts)
    const [openCartSheet, setOpenCartSheet] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout() {
        dispatch(logoutUser());
    }

    useEffect(() => {
        if (user) {
            dispatch(getCart(user.id));
        }
    }, [user, dispatch]);

    return <div className="flex lg:items-center lg:flex-row flex-col gap-4">
        <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
            <Button onClick={() => setOpenCartSheet(true)}
                variant="outline"
                size="icon"
                className="relative"
            >
                <ShoppingCart className="w-6 h-6" />
                {cartItems && cartItems?.products && cartItems?.products.length > 0 ? <span className="absolute top-[-3px] right-[-8px] border border-black rounded-full px-1 bg-white">{cartItems?.products?.length}</span> : null}
                <span className="sr-only">User cart</span>
            </Button>
            <UserCartWarpper
                cartItems={cartItems && cartItems.products && cartItems.products.length > 0 ? cartItems.products : []}
                setOpenCartSheet={setOpenCartSheet} />
        </Sheet>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="bg-black">
                    <AvatarFallback className='bg-black text-white font-extrabold'>
                        {user?.userName[0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" className='w-56'>
                <DropdownMenuLabel>Hello {user ? user?.userName : 'Guest'}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user ? <>
                    <DropdownMenuItem onClick={() => navigate('/shop/account')}>
                        <User className="mr-2 h-4 w-4" />
                        Account
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleLogout()}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </DropdownMenuItem></>
                    : <DropdownMenuItem onClick={() => navigate('/auth/login')}>
                        <User className="mr-2 h-4 w-4" />
                        Login
                    </DropdownMenuItem>}


            </DropdownMenuContent>
        </DropdownMenu>
    </div>
}

function ShoppingHeader() {

    return <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
            <Link to="/shop/home" className="flex items-center gap-2">
                <House className="h-6 w-6" />
                <span className="font-bold">Ecomm</span>
            </Link>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle header menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-xs">
                    <MenuItems />
                    <HeaderRightContent />
                </SheetContent>
            </Sheet>

            <div className="hidden lg:block">
                <MenuItems />
            </div>

            <div className="hidden lg:block">
                <HeaderRightContent />
            </div>

        </div>
    </header>
}

export default ShoppingHeader;