import heroImage from "../assets/images/ayunie-hero.webp"

const Hero = () => {

    return (
        <div className="relative w-full h-96 overflow-hidden">
            <img src={heroImage} alt="Hero" className="absolute w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white text-center z-10">
                <h1 className="text-4xl md:text-5xl font-bold shadow-lg">Welcome to Ayunie Vacation</h1>
                <p className="text-xl md:text-2xl mt-4 shadow-lg">Redefined comfort beyond expectation</p>
            </div>
        </div>
        // <div className="bg-blue-800 pb-16">
        //     <div className="container mx-auto flex flex-col gap-2">
        //         <h1 className="text-5xl text-white font-bold">Find your next vacation</h1>
        //         <p className="text-white text-2xl">Book your next trip in 3 easy steps</p>
        //     </div>
        // </div>
    )
}

export default Hero