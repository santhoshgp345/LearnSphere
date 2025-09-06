import CTAButton from "./CTAButton.jsx";
import { FaArrowRight } from "react-icons/fa";

const CodeContext = ({heading,textPara,ctabtn1,ctabtn2}) => {
    return(
        <div className="w-[45%] flex flex-col">
            {heading}
            <div className="text-[#999DAA]">
                {textPara}
            </div>

            <div className="flex flex-row gap-7 mt-12">
                <CTAButton active={true} linkto={"/signup"} >
                    <p className="mr-2">{ctabtn1} </p><FaArrowRight/>
                </CTAButton>
                <CTAButton active={false} linkto={"/login"}>
                    {ctabtn2}
                </CTAButton>
            </div>
        </div>
    )
}

export default CodeContext;