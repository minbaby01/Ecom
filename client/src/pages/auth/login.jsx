import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { loginGoogle, loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import Cookies from 'universal-cookie';


const initialState = {
    email: '',
    password: ''
}

function AuthLogin() {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const { toast } = useToast();
    function onSubmit(event) {
        event.preventDefault();

        dispatch(loginUser(formData)).then((data) => {
            if (data?.payload?.success) {
                toast({
                    title: data?.payload?.message,
                })
            } else {
                toast({
                    title: data?.payload?.message,
                    variant: "destructive"
                })
            }
        });
    }

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in</h1>
                <p>Don&apos;t have an account
                    <Link to="/auth/register" className="font-medium ml-2 text-primary hover:underline">Register</Link>
                </p>
            </div>

            <CommonForm
                formControls={loginFormControls}
                formData={formData}
                setFormData={setFormData}
                buttonText={'Sign In'}
                onSubmit={onSubmit}
            />

            <GoogleLogin
                onSuccess={credentialResponse => {
                    dispatch(loginGoogle({token: credentialResponse.credential})).then((data) => {
                        console.log(data);
                        
                        // if (data?.payload?.success) {
                        //     toast({
                        //         title: data?.payload?.message,
                        //     })
                        // } else {
                        //     toast({
                        //         title: data?.payload?.message,
                        //         variant: "destructive"
                        //     })
                        // }
                    });
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </div>

    );
}

export default AuthLogin;