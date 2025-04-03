import HighlightText from "./HighlightText.jsx";
import { FaArrowRight} from "react-icons/fa";
import CTAButton from "./CTAButton.jsx"
import ImgInstructor from "../../assets/Images/being_instructor.jpg"

const InstructorSection = () => {
    return(
        <div className="w-[85%] flex flex-row items-center justify-between mx-auto my-10 p-6">
            <div className="w-[45%] bg-white shadow-xl shadow-blue-300">
                <img className="translate-x-4 translate-y-4" src={ImgInstructor} alt="insructor" />
            </div>
            <div className="w-[45%] flex flex-col items-start">
                    <div className="w-[100%] text-3xl font-semibold">
                        Become <HighlightText text={"an Instructor"}/>
                    </div>
                    <div className="w-[100%] text-[#999DAA] my-4">
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                    </div>
                    <div className="p-4 mt-6">
                        <CTAButton active={true} linkto={"/signup"}>
                           <p className="mr-3">Start Teaching today </p><FaArrowRight/>
                        </CTAButton>
                    </div>
            </div>

        </div>
    )
}

export default InstructorSection;