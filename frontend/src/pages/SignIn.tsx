import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { showToast } from "../components/Toast";

export type SignInFormData = {
    email: string;
    password: string;
}

const SignIn = () => {
    const queryClient = useQueryClient();
    const location = useLocation();

    //signin form hook
    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>();

    const { showToast } = useAppContext();

    const navigate = useNavigate();

    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
            showToast({ message: "Sign in successful", type: "SUCCESS" });
            await queryClient.invalidateQueries("validateToken");
            navigate(location.state?.from?.pathname || "/");
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        }
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <div className="flex flex-col justify-center py-10 items-center">
            <form className="w-2/5 flex flex-col gap-5" onSubmit={onSubmit}>
                <h2 className="text-xl font-bold text-center">Sign In</h2>

                <div>
                <label className="text-gray-700 text-xs font-bold flex-1">
                    Email
                    <input className="bg-gray-100 rounded w-full py-3 px-2 font-normal" type="email" placeholder="Enter your Email" {...register('email', { required: "This field is required" })} />
                    {errors.email && (
                        <span className="text-red-500">{errors.email.message}</span>
                    )
                    }
                </label>


                <label className="text-gray-700 text-xs font-bold flex-1">
                    Password
                    <input className="bg-gray-100 rounded w-full py-3 px-2 font-normal" type="password" placeholder="Enter your Password" {...register('password',
                        {
                            required: "This field is required",
                            minLength: {
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
                </div>

                <div className="flex items-center justify-between">
                    <span>
                        <input type="checkbox" value="" className="w-3 h-3 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" required />
                        <label className="text-xs text-gray px-1">Keep me signed in</label>
                    </span>

                    <span className="text-xs">
                        <Link to="/register" className="text-blue-600">
                            Forgot password?
                        </Link>
                    </span>

                </div>

                <div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-l py-2 rounded" type="submit">
                        Login
                    </button>
                </div>

                <div className="inline-flex items-center justify-center w-full">
                    <hr className="w-full h-px my-4 bg-gray-200 border-0" />
                    <span className="absolute text-xs text-gray-700 px-3 -translate-x-1/2 bg-white left-1/2">or use one of these options</span>
                </div>

                <div className="grid gap-3">
                    <button className="w-full bg-white border hover:bg-gray-100 text-gray-700 text-s py-2 rounded" type="submit">
                        Continue with Google
                    </button>
                    <button className="w-full bg-blue-900 hover:bg-blue-700 text-white text-s py-2 rounded" type="submit">
                        Continue with Facebook
                    </button>
                </div>

                <div className="flex justify-center items-center pt-10">
                    <span className="text-sm">
                        Don't have an account? {" "}
                        <Link to="/register" className="text-blue-600">
                            Register
                        </Link>
                    </span>
                </div>
            </form>
        </div>
    )
}

export default SignIn