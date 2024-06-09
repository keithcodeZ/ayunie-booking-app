const Footer = () => {

    return (
        <div className="bg-blue-800 py-10">
            <div className="container mx-auto flex justify-between items-center">
                <h2 className="text-3xl text-white font-bold tracking-tight">MernHolidays.com</h2>
                <div className="flex gap-4 text-white font-bold tracking-tight">
                    <a className="cursor-pointer">Privacy Policy</a>
                    <a className="cursor-pointer">Terms of Service</a>
                    {/* <p>Powered by Mern</p>
                    <p>Copyright © 2022. All rights reserved.</p> */}
                </div>
            </div>
        </div>
    )
}

export default Footer