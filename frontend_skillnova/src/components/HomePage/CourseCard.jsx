import { HiMiniUsers } from "react-icons/hi2";
import { ImTree } from "react-icons/im";

const CourseCard = ({activeCard,course,setActiveCard}) => {

    let cardHeading,cardFoot,bodyBg;

    if(course.heading === activeCard){
        cardHeading = "text-black";
        cardFoot = "text-[#0A5A72]";
        bodyBg = "bg-white text-[#585D89] -translate-x-3 -translate-y-3";
    }else{
        cardHeading = "text-white";
        cardFoot = "text-[#6E727F]";
        bodyBg = "bg-[#161D29] text-[#6E727F] hover:bg-[#202b3e]";
    }

    return(
        <div 
        onClick={() => setActiveCard(course.heading)}
        className="h-[40vh] w-[30%] bg-yellow-500 cursor-pointer transition-all duration-100"
        >
            <div className={`h-[40vh] flex flex-col ${bodyBg} justify-between`}>
            <div className="flex flex-col p-6">
                <div className={`p-2 text-2xl font-semibold ${cardHeading}`}>
                    {course.heading}
                </div>
                <div className="p-2 mt-2">
                    {course.description}
                </div>
                
            </div>
            <div className={`flex flex-row justify-between py-2 px-6 text-xl border-t-2 border-dashed border-[#6E727F] ${cardFoot}`}>
                <div className="p-2 flex flex-row gap-2 items-center">
                    <HiMiniUsers/> <p>{course.level}</p>
                </div>
                <div className="p-2 flex flex-row gap-2 items-center">
                    <ImTree/> <p>{course.lessonNumber} Lessons</p>
                </div>
            </div>
            </div>
        </div>
    )
}

export default CourseCard;