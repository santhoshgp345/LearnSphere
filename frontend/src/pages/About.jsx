import HighlightText from "../components/HomePage/HighlightText";
import AboutBanner1 from "../assets/Images/aboutUsBanner1.jpeg"
import AboutBanner2 from "../assets/Images/aboutUsBanner2.jpeg"
import AboutBanner3 from "../assets/Images/aboutUsBanner3.jpeg"
import AboutStoryBanner from "../assets/Images/aboutStoryBanner.jpeg"
import StatsComponent from "../components/AboutUs/StatsComponent";
import LearningGrid from "../components/AboutUs/LearningGrid";
import ContactFormSection from "../components/AboutUs/ContactFormSection";
import Footer from "../components/Footer/Footer";
import ReviewSlider from "../components/ReviewSection/ReviewSlider";

const About = () => {
    return(
        <div className="w-[100vw] mx-auto flex flex-col gap-5 items-center">
            {/* section 1 */}
            <section className="relative w-[85%] flex flex-col flex-wrap items-center justify-between p-4">
                <div className="w-[90%] md:w-[65%] mt-8 flex flex-col gap-4 items-center justify-between text-center p-4 text-[#F1F2FF]">
                    <h1 className="text-2xl md:text-3xl font-semibold md:px-10">
                    Driving Innovation in Online Education for a <HighlightText text={"Brighter Future"}/>
                    </h1>
                    <p className="text-[#838894]">
                    StudyNotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                    </p>
                </div>
                <div className="w-[90%] h-[145vh] md:h-[22vh] md:w-[80%] my-4 mx-auto">

                </div>
                <div className="absolute top-[40%] md:top-[65%] w-[85%] md:h-[45vh] flex  flex-col md:flex-row gap-3 justify-between">
                    <img src={AboutBanner1} alt="" />
                    <img src={AboutBanner2} alt="" />
                    <img src={AboutBanner3} alt="" />
                </div>
            </section>

            {/* section 2 */}
            <section className="w-[100vw] flex flex-col items-center">
                <div className="bg-[#161D29] w-[100%] flex flex-col items-center justify-between text-[#AFB2BF] text-2xl md:text-3xl font-semibold">
                  <div className="w-[85%] h-[25vh]">
                  </div>

                  <div className="w-[75%] text-center my-6 p-4">
                  <span className="text-[#424854]">" </span>We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightText text={"combines technology"}/>, <span className="text-[#FF512F]">expertise</span>, and community to create an <span className="text-[#F9D423]">unparalleled educational experience.</span><span className="text-[#424854]"> "</span>
                  </div>

                </div>

                <div className="w-[100%] flex flex-col items-center justify-between p-4">
                    <div className="w-[85%] flex flex-col md:flex-row items-center justify-evenly gap-4 px-4 py-6 mt-6">
                        <div className="w-[85%] md:w-[35%] flex flex-col gap-3">
                            <h2 className="text-[#FF512F] text-3xl font-semibold">
                            Our Founding Story
                            </h2>
                            <p className="text-sm text-[#838894]">
                            Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                            </p>
                            <p className="text-sm text-[#838894]">
                            As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                            </p>
                        </div>
                        <div className="p-4 w-[90%] md:w-[40%]">
                            <img src={AboutStoryBanner} alt="" />
                        </div>
                    
                    </div>

                    <div className="w-[85%] flex flex-col md:flex-row items-center justify-evenly gap-4 px-4 py-8 my-10">
                        <div className="w-[90%] md:w-[35%] flex flex-col gap-4">
                            <h2 className="text-[#F9D423] text-3xl font-semibold">
                            Our Vision
                            </h2>
                            
                            <p className="text-sm text-[#838894]">
                            With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                            </p>
                        </div>

                        <div className="w-[90%] md:w-[35%] flex flex-col gap-4">
                            <h2 className="text-[#1FA2FF] text-3xl font-semibold">
                            Our Mission
                            </h2>
                            
                            <p className="text-sm text-[#838894]">
                            our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                            </p>
                        </div>
                        
                        
                    </div>
                </div>
            </section>

            {/* section 3 */}
            <StatsComponent/>

            {/* section 4 */}
            <LearningGrid/>

            {/* section 5 */}
            <section className="w-[100vw]">
                <ContactFormSection/>
            </section>

            <div className="w-11/12 flex flex-col mx-auto text-white items-center">
            <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
               <ReviewSlider/>
            </div>

            <Footer/>
            
        </div>
    )
}

export default About;