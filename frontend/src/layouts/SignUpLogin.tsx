import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
// import Hero from "../components/Hero";

interface Props {
    children: React.ReactNode;
}

const SignUpLogin = ({children}: Props) => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* <h1>MAKING THE HEADER COMPONENT</h1> */}
            <Header />
            {/* <Hero /> */}
            <div className="container mx-auto py-10 flex-1">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default SignUpLogin;