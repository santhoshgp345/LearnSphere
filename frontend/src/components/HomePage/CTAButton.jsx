import { Link } from "react-router-dom";

const CTAButton = ({children,active,linkto}) => {
    return(
        <Link to={linkto}>
            <div className={`flex flex-row items-center text-md text-lg px-6 py-3 rounded-md font-semibold hover:scale-95 transition-all duration-200
                ${active ? "bg-yellow-400 text-black" : "bg-[#161D29] text-white"}
                `}>
                {children}
            </div>
        </Link>
    )
}

export default CTAButton;