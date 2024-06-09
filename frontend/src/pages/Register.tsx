import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = () => {
    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const {showToast} = useAppContext();

    const {
        register,
        watch,
        handleSubmit,
        formState: {errors}
    } = useForm<RegisterFormData>();

    //register function is a fetch request
    //we use react-query here so we don't have to manage any state manually
    //states are managed by react-query useMutation hook
    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            console.log("registration success");

            showToast({message: "Registration successful", type: "SUCCESS"});

            await queryClient.invalidateQueries("validateToken");

            navigate("/");
        },
        onError: (error: Error) => {
            console.log(error.message);
            showToast({message: error.message, type: "ERROR"});
        }
    });

    const onSubmit = handleSubmit((data) => {
        // console.log(data);

        //the mutate function will pass the data into our form to the apiClient register function in api-client.ts
        mutation.mutate(data);
    })

    return (
        // <div></div>
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Create an Account</h2>

            {/* flex-col is the default for mobile-first dev */}
            <div className="flex flex-col md:flex-row gap-5">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input className="border rounded w-full py-1 px-2 font-normal" type="text" placeholder="Enter your first name" {...register('firstName', {required: "This field is required"})} />
                    {/* shorthand to say if the left is TRUE then to the RIGHT */}
                    {errors.firstName && (
                        <span className="text-red-500">{errors.firstName.message}</span>
                        )
                    }
                </label>

                <label className="text-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input className="border rounded w-full py-1 px-2 font-normal" type="text" placeholder="Enter your last name" {...register('lastName', {required: "This field is required"})} />
                    {errors.lastName && (
                        <span className="text-red-500">{errors.lastName.message}</span>
                        )
                    }
                </label>              
            </div>

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

            <label className="text-gray-700 text-sm font-bold flex-1">
                Confirm Password
                <input className="border rounded w-full py-1 px-2 font-normal" type="password" id="password" placeholder="Re-enter your Password" {...register('confirmPassword',
                    {
                        validate: (value) => {
                            if (!value){
                                return "This field is required";
                            } else if (watch("password") !== value) {
                                return "Passwords do not match";
                            }

                        },
                    }
                )} />
                {errors.confirmPassword && (
                    <span className="text-red-500">{errors.confirmPassword.message}</span>
                    )
                }
            </label>

            <div className="flex justify-between items-center">
                <span className="text-sm">
                    Have an account already? {" "}
                    <Link to="/sign-in" className="underline">
                        Sign in here
                    </Link>
                </span>
                <button className="bg-yellow-900  hover:bg-yellow-800 text-white font-bold text-xl py-2 px-4 rounded" type="submit">
                    Create Account
                </button>
            </div>

            {/* <span className="flex justify-end">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl py-2 px-4 rounded" type="submit">
                    Create Account
                </button>
            </span> */}



        </form>
    )
}

export default Register
