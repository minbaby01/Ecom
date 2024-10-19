import { Outlet } from "react-router-dom";
import ShoppingHeader from "../shoppping-view/header";

function AuthLayout() {
    return <>
        <ShoppingHeader />

        <div className="flex min-h-screen w-full">
            <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
                <div className="max-w-md space-y-6 text-center text-primary-foreground">
                    <h1 className="text-4xl font-extrabold tracking-tight">admin panel: &#39;admin@gmail.com&#39; password: &#39;admin&#39;</h1>
                </div>
            </div>

            <div className="flex flex-1 items-center bg-background px-4 py-12 sm:px-6 lg:px-8">
                <Outlet />
            </div>
        </div>
    </>;
}

export default AuthLayout;