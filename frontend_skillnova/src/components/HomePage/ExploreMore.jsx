import { useState } from "react";
import { exploreData } from "../../data/homepage-explore.js";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard.jsx";

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]

const ExploreMore = () => {
    const [currentTab,seCurrentTab] = useState(tabsName[0]);
    const [courses,setCourses] = useState(exploreData[0].courses);

    const [activeCard,setActiveCard] = useState(exploreData[0].courses[0].heading);


    const setMyCard = (tabName) => {
        seCurrentTab(tabName);

        const newCourses = exploreData.filter((course) => course.tag === tabName);
        setCourses(newCourses[0].courses);

        setActiveCard(newCourses[0].courses[0].heading);
    }

    return(
        <div className="w-[85%] relative flex flex-col items-center mx-auto p-4 my-10 text-white">
            <div className="text-4xl font-semibold">
                Unlock the <HighlightText text={"Power of Code"}/>
            </div>
            <div className="text-[#999DAA] text-md mt-3">
                Learn to Build Anything You Can Imagine
            </div>
            <div className="flex flex-row items-center gap-3 p-1 bg-[#161D29] rounded-full mt-4 border-b-2 border-[#FFFFFF2E]">
                {
                    tabsName.map((element,index) => {
                        return (
                            <div 
                            onClick={() => setMyCard(element)}
                            key={index}
                            className={`text-lg text-[#999DAA] py-2 px-4 rounded-full ${currentTab === element ? ("text-white bg-[#000814]") : ("")}
                            cursor-pointer transition-all duration-100 hover:text-white`}
                            >
                                {element}
                            </div>
                        )
                    })
                }
            </div>

            {/* for leaving the space */}
            <div className="h-[25vh]"></div>

            {/* Creating cards group */}
            <div className="absolute top-[30vh] flex flex-row items-center mx-auto p-4 gap-12 justify-between">
                {
                    courses.map((course,index) => {
                        return (
                        <CourseCard
                        activeCard={activeCard}
                        course={course}
                        key={index}
                        setActiveCard={setActiveCard}
                        />
                    )
                    })
                }
            </div>

        </div>
    )
}

export default ExploreMore;