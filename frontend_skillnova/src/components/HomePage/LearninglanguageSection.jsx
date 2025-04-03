import HighlightText from "./HighlightText.jsx";
import Other1 from "../../assets/Images/home_other1.png";
import Other2 from "../../assets/Images/home_other2.png";
import Other3 from "../../assets/Images/home_other3.png";
import Other4 from "../../assets/Images/home_other4.png";
import { HiSparkles } from "react-icons/hi";
import { IoWatch } from "react-icons/io5";
import { RiComputerFill } from "react-icons/ri";
import Calendar from "react-calendar/dist/cjs/Calendar.js";
import 'react-calendar/dist/Calendar.css';
import CTAButton from "./CTAButton.jsx";

const LearninglanguageSection = () => {
    const otherImages = [
        {
            image:Other1,
            name:"Michael Richard"
        },
        {
            image:Other2,
            name:"Wade Warren"
        },
        {
            image:Other3,
            name:"Eleanor Pena"
        },
        {
            image:Other4,
            name:"Jane Cooper"
        },
    ]

    return(
        <div className="flex flex-col w-[85%] p-4 mx-auto my-6 justify-between items-center">
            <div className="flex flex-col items-center justify-between mx-auto">
                <div className="text-3xl font-semibold">
                Your swiss knife for <HighlightText text={"learning any language"}/>
                </div>
                <div className="w-[60%]  text-md font-semibold text-center">
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>
            </div>
            <div className="w-[100%] flex flex-row items-center justify-evenly mx-auto p-2 mt-14">
                <div className="w-[30%] flex flex-col items-center shadow-2xl origin-bottom-right rotate-12">
                    <div className="w-[100%] p-4 bg-[#B4DAEC] text-[#0A5A72] font-semibold text-lg">
                        Know Your Progress
                    </div>
                    <div className="w-[100%] px-4 py-6 flex flex-col">
                        <div className="p-2 mx-2">
                            <div className="flex flex-row items-center gap-2 text-2xl font-semibold"><RiComputerFill /><p> HTML</p></div>
                            <p>Your Current league</p>
                        </div>
                        <div className="flex flex-row items-center justify-between m-2">
                            <div className="flex flex-col shadow-lg p-3">
                                <p className="text-yellow-500 text-lg"><HiSparkles/></p>
                                <p className="text-xl font-semibold p-1">420</p>
                                <p>Spin earned</p>
                            </div>
                            <div className="flex flex-col shadow-lg p-3">
                                <p className="text-lg"><IoWatch/></p>
                                <p className="text-xl font-semibold p-1">1254</p>
                                <p>minutes in app</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[30%] flex flex-col items-center shadow-2xl origin-top-right -rotate-6">
                <div className="w-[100%] p-4 bg-[#FBC7D1] text-[#4F0A25] font-semibold text-lg">
                        Compare with others
                    </div>
                    <div className="w-[100%] px-4 py-6">
                    <div className="flex flex-col p-2">
                            {
                                otherImages.map((person,index) => {
                                    return <div key={index} className="flex flex-row items-center gap-2">
                                                <div className="w-[20%] p-2">
                                                    <img src={person.image} alt="ph" />
                                                </div>
                                                <div className="font-semibold text-lg">
                                                    {person.name}
                                                </div>
                                            </div>
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="w-[30%] flex flex-col items-center shadow-2xl origin-top-left rotate-12 ">
                <div className="w-[100%] p-4 bg-[#FFE395] text-[#41260B] font-semibold text-lg">
                        Plan your lessons
                    </div>
                    <div className="w-[100%] px-4 py-6 ">
                        <Calendar
                        activeStartDate={new Date(2025, 0, 1)}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center mx-auto my-10 p-4">
                <CTAButton active={true} linkto={"/login"}>
                    Learn More
                </CTAButton>
            </div>
        </div>
    )
}

export default LearninglanguageSection;