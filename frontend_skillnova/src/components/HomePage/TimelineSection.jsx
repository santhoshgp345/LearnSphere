import LearnBG from "../../assets/Images/home_learning.mp4";
import { SlBadge } from "react-icons/sl";
import { HiMiniCodeBracketSquare } from "react-icons/hi2";
import { IoDiamond } from "react-icons/io5";
import { RiGraduationCapFill } from "react-icons/ri";

const TimelineSection = () => {
    return(
        <div className="relative flex flex-row w-[85%] p-4 mx-auto my-6 justify-between items-center">
            <div className="w-[42%] flex flex-col items-center mx-auto">
                <div className="w-[80%] p-2 flex flex-row items-center gap-5">
                    <div className="w-[12%] text-3xl text-blue-500 p-2 rounded-full bg-white">
                    <SlBadge />
                    </div>
                    <div className="flex flex-col gap-1 p-2">
                        <div className="text-xl font-semibold">
                            Leadership
                        </div>
                        <div className="text-md">
                        Fully committed to the success company
                        </div>

                    </div>
                </div>
                <div className="w-[80%] p-2 flex flex-row items-center gap-5">
                    <div className="w-[12%] text-3xl text-pink-500 p-2 rounded-full bg-white">
                    <RiGraduationCapFill/>
                    </div>
                    <div className="flex flex-col gap-1 p-2">
                        <div className="text-xl font-semibold">
                            Responsibility
                        </div>
                        <div className="text-md">
                        Students will always be our top priority
                        </div>

                    </div>
                </div>
                <div className="w-[80%] p-2 flex flex-row items-center gap-5">
                    <div className="w-[12%] text-3xl text-green-700 p-2 rounded-full bg-white">
                    <IoDiamond/>
                    </div>
                    <div className="flex flex-col gap-1 p-2">
                        <div className="text-xl font-semibold">
                            Flexibility
                        </div>
                        <div className="text-md">
                        The ability to switch is an important skills
                        </div>

                    </div>
                </div>
                <div className="w-[80%] p-2 flex flex-row items-center gap-5">
                    <div className="w-[12%] text-3xl text-yellow-400 p-2 rounded-full bg-white">
                    <HiMiniCodeBracketSquare/>
                    </div>
                    <div className="flex flex-col gap-1 p-2">
                        <div className="text-xl font-semibold">
                            Solve the problem
                        </div>
                        <div className="text-md">
                        Code your way to a solution
                        </div>

                    </div>
                </div>
            </div>
            <div className="w-[50%] shadow-sky-600 shadow-md p-2">
                <div className="absolute -bottom-[5%] right-[10%] flex flex-row w-[30%] bg-green-800 h-[20%] p-3 items-center justify-around">
                    <div className="flex flex-row items-center p-2 gap-2">
                        <p className="text-white text-3xl font-semibold">10</p>
                        <p className="text-sm font-light text-green-200">YEARS OF EXPERIENCE</p>
                    </div>
                    <div className="w-1 h-[80%] bg-green-200">

                    </div>
                    <div className="flex flex-row items-center p-2 gap-2">
                        <p className="text-white text-3xl font-semibold">250</p>
                        <p className="text-sm font-light text-green-200">TYPES OF COURSES</p>
                    </div>
                </div>
                <video src={LearnBG}
                muted
                autoPlay
                loop
                ></video>
            </div>
        </div>
    )
}

export default TimelineSection;