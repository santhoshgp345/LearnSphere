import HighlightText from "../HomePage/HighlightText";
import CTAButton from "../HomePage/CTAButton";

const learningGridArray = [
    {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description: "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
    },
    {
        order: 2,
        heading: "Our Learning Methods",
        description: "The learning process uses the namely online and offline."
    },
    {
        order: 3,
        heading: "Certification",
        description: "You will get a certificate that can be used as a certification during job hunting."
    },
    {
        order: 4,
        heading: `Rating "Auto-grading"`,
        description: "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor."
    },
    {
        order: 5,
        heading: "Ready to Work",
        description: "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program."
    }
]

const LearningGrid = () => {
    return(
        <section className="w-[100vw] flex flex-col items-center justify-between text-white">
            <div className="w-[90%] md:w-[80%] grid grid-rows-2 grid-flow-col gap-5 my-8 p-6 mx-auto">
                <div className="w-[25rem] md:w-[30rem] flex flex-col px-4 gap-4 justify-between mx-4">
                    <h1 className="text-3xl text-[#F1F2FF] font-semibold">
                    World-Class Learning for <HighlightText text={"Anyone, Anywhere"}/>
                    </h1>
                    <p className="text-sm text-[#838894]">
                    Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.
                    </p>
                    <div className="w-[40%]">
                      <CTAButton active={true} linkto={"/"}>
                        Learn More
                      </CTAButton>
                    </div>
                </div>
                {
                   learningGridArray.map((card,index) => {
                    return(
                        <div key={index} className={`w-[20rem] h-[17rem] p-8 flex flex-col gap-5 ${card.order % 2 === 0 ? "bg-[#2C333F]":"bg-[#161D29]"}`}>
                            <h2 className="text-xl font-semibold text-[#F1F2FF]">
                                {card.heading}
                            </h2>
                            <p className="text-sm text-[#AFB2BF]">
                                {card.description}
                            </p>
                        </div>
                    )
                   }) 
                }

            </div>
        </section>
    )
}

export default LearningGrid;