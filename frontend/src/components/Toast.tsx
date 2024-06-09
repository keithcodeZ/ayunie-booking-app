import { useEffect } from "react";

type ToastProps = {
    message: string;
    type: "SUCCESS" | "ERROR";
    onclose: () => void;
}

const Toast = ({message, type, onclose}: ToastProps) => {

    //onclose means that this hook wil only run first time the component is rendered and when the onclose function is called
    useEffect(() => {
        const timer = setTimeout(() => {
            console.log("hiding toast");
            onclose();
        }, 5000);

        //clears the timer whenever the component is closed
        return () => {
            clearTimeout(timer);
        }
    }, [onclose]);

    const styles = type === "SUCCESS" 
        ? "fixed top-4 right-4 bg-green-600 z-50 p-4 text-white rounded-md max-w-md" 
        : "fixed top-4 right-4 bg-red-600 z-50 p-4 text-white rounded-md max-w-md"

    return (
        <div className={styles}>
            <div className="flex justify-center items-center">
                <span className="text-lg font-semibold">{message}</span>
            </div>
        </div>

        // <div className={`rounded-md p-4 text-white ${type === "SUCCESS" ? "bg-green-500" : "bg-red-500"}`}>
        //     {message}
        // </div>
    )
}

export default Toast