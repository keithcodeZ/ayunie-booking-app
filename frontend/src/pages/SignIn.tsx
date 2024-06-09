import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
// import { showToast } from "../components/Toast";

export type SignInFormData = {
    email: string;
    password: string;
}

const SignIn = () => {
    const queryClient = useQueryClient();

    //signin form hook
    const {register, handleSubmit, formState: {errors}} = useForm<SignInFormData>();

    const {showToast} = useAppContext();

    const navigate = useNavigate();

    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
            showToast({message: "Sign in successful", type: "SUCCESS"});
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        onError: (error: Error) => {
            showToast({message: error.message, type: "ERROR"});
        }
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Sign In</h2>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input className="border rounded w-full py-1 px-2 font-normal" type="email" placeholder="Enter your Email" {...register('email', {required: "This field is required"})} />
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                    )
                }
            </label>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Password
                <input className="border rounded w-full py-1 px-2 font-normal" type="password" placeholder="Enter your Password" {...register('password',
                    {required: "This field is required",
                        minLength:{
                            value: 6,
                            message: "Password must be at least 6 characters long"
                        }
                    }
                )} />
                {errors.password && (
                    <span className="text-red-500">{errors.password.message}</span>
                    )
                }
            </label>
            
            <div className="flex justify-between items-center">
                <span className="text-sm">
                    Not registered? {" "}
                    <Link to="/register" className="underline">
                        Create an account here
                    </Link>
                </span>
                <button className="bg-yellow-900  hover:bg-yellow-800 text-white font-bold text-xl py-2 px-4 rounded" type="submit">
                    Login
                </button>
            </div>
        </form>
    )
}

export default SignIn