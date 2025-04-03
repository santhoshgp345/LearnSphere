import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/HomePage/HighlightText.jsx";
import CTAButton from "../components/HomePage/CTAButton.jsx";
import Banner from "../assets/Images/banner.mp4"
import CodeContext from "../components/HomePage/CodeContext.jsx";
import CodeBlocks from "../components/HomePage/CodeBlocks.jsx";
import TimelineSection from "../components/HomePage/TimelineSection.jsx";
import LearninglanguageSection from "../components/HomePage/LearninglanguageSection.jsx";
import InstructorSection from "../components/HomePage/InstructorSection.jsx";
import Footer from "../components/Footer/Footer.jsx";
import ExploreMore from "../components/HomePage/ExploreMore.jsx";
import ReviewSlider from "../components/ReviewSection/ReviewSlider.jsx";

const Home = () => {
    return(
        <div>
            {/*Section - 1 black background */}
            <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between">
                <Link to={"/signup"}>
                <div className="group mt-10 mx-auto rounded-full bg-[#161D29] font-semibold transition-all duration-200 hover:scale-95 w-full">
                    <div className="p-3 flex flex-row items-center rounded-full text-[#999DAA] group-hover:bg-[#0e141d]">
                        <p className="mx-4">Become an Instructor</p>
                        <FaArrowRight className="mr-4"/>
                    </div>
                </div>
                </Link>

                <div className="mt-8 text-center text-4xl text-white font-semibold">
                Empower Your Future with <HighlightText text={"Coding Skills"}/>
                </div>
                <div className="mt-4 text-center w-[60%] text-[#999DAA]">
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
                </div>
                <div className="flex flex-row gap-7 mt-10">
                    {/*using button as a component */}
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>
                    <CTAButton active={false} linkto={"/login"}>
                        Book a Demo
                    </CTAButton>
                </div>

                <div className="w-[60%] h-auto shadow-2xl shadow-[#4e6690] my-14 bg-sky-600">
                    <video className="-translate-y-4 -translate-x-4"
                    src={Banner} type="video/mp4"
                    muted
                    loop
                    autoPlay
                    ></video>
                </div>

                {/*code section -1 having two components*/}
                <div className="w-[80%] flex flex-row my-20 justify-between gap-10 items-center">
                    <CodeContext 
                    heading={
                        <div className="text-3xl font-semibold mb-4">
                            Unlock your <HighlightText text={"coding potential"}/> with our online courses.
                        </div>
                    }
                    textPara="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    ctabtn1="Try it Yourself"
                    ctabtn2="Learn more"
                    />
                    <CodeBlocks
                    codeColor={"text-red-500"}
                    codeBlock={`<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
                    />
                </div>

                {/*code section -2 having two similar components*/}
                <div className="w-[80%] flex flex-row my-20 justify-between gap-10 items-center">
                    <CodeBlocks
                    codeColor={"text-green-600"}
                    codeBlock={`<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
                    />
                    <CodeContext 
                    heading={
                        <div className="text-3xl font-semibold mb-4">
                            Start <HighlightText text={"Coding in Seconds"}/>
                        </div>
                    }
                    textPara="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                    ctabtn1="Continue Lesson"
                    ctabtn2="Learn more"
                    />
                </div>

                <ExploreMore/>

            </div>

            {/*Section - 2 white background */}
            <div className="bg-[#F9F9F9] text-[#161D29]">
                <div className="h-[40vh] homepage_bg">
                    <div className="h-[40vh] w-11/12 max-w-maxContent flex flex-col justify-center gap-5 mx-auto">
                    <div className="h-[25vh]">

                    </div>
                    <div className="h-[20vh] flex flex-row gap-7 justify-center items-center my-6">
                        <CTAButton active={true} linkto={"/catalog"}>
                            <p className="mr-3">Explore Full Catalog </p><FaArrowRight/>
                        </CTAButton>
                        <CTAButton active={false} linkto={"/login"}>
                            Learn More
                        </CTAButton>
                    </div>
                    </div>
                    
                </div>

                <div className="w-11/12 mx-auto my-3 max-w-maxContent flex flex-col items-center justify-between gap-7">
                <div className="w-[85%] mx-auto mt-10 p-4 flex flex-row justify-around gap-8">
                    <div className="p-4 h-auto text-3xl font-semibold">
                    Get the skills you need for a <HighlightText text={"job that is in demand."}/>
                    </div>
                    <div className="p-4 h-auto flex flex-col">
                        <div>
                        The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </div>
                        <div className="mt-4 w-[25%]">
                            <CTAButton active={true} linkto={"/login"}>
                                Learn More
                            </CTAButton>
                        </div>
                    </div>

                </div>
                </div>

                <div className="w-11/12 mx-auto my-3 max-w-maxContent flex flex-col items-center justify-between gap-7">
                <TimelineSection/>
                </div>

                <div className="w-11/12 mx-auto my-3 max-w-maxContent flex flex-col items-center justify-between gap-7">
                <LearninglanguageSection/>
                </div>

            </div>

            {/*Section - 3 black background */}
            <div className="w-11/12 mx-auto flex flex-col items-center text-white justify-between">
               <InstructorSection/>
               
               <div className="w-11/12 flex flex-col mx-auto items-center">
               <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
               <ReviewSlider/>
               </div>
            </div>

            {/*Section - 4 Footer */}
            <Footer/>

        </div>
    )
}

export default Home;