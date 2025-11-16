import alert from "../../../public/assets/alert.png"
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

function Navbar() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return(
        <nav className="w-full flex items-center justify-between bg-white text-white p-1 border-b-2 border-blue-200 font-mono">

            <Link to="/home" className="flex items-center gap-2 px-4 py-2 text-black hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded flex items-center justify-center overflow-hidden">
                    <img
                        src={alert}
                        alt="alert icon"
                        className="w-full h-full object-cover"
                    />
                </div>

                <h1 className="text-xl font-bold tracking-wider drop-shadow-md">
                    ALERTA<span className="text-sky-400">UTEC</span>
                </h1>
            </Link>

            <div className="flex text-black items-center gap-2 px-4 py-2">
                <span className="text-sm">{time}</span>
            </div>
        </nav>
    )
}

export default Navbar;
