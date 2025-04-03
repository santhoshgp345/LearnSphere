import RenderSteps from "./RenderSteps";

const courseTips = [
    "Set the Course Price option or make it free.",
    "Standard size for the course thumbnail is 1024x576.",
    "Video section controls the course overview video.",
    "Course Builder is where you create & organize a course.",
    "Add Topics in the Course Builder section to create lessons, quizzes, and assignments.",
    "Information from the Additional Data section shows up on the course single page.",
    "Make Announcements to notify any important",
    "Notes to all enrolled students at once."
];

const AddCourses = () => {
    return (
        <div className="w-[100%] flex justify-between items-center">
            <div className="w-[100%] flex md:flex-row flex-col gap-7">
                <div className=" w-[90%] p-3 flex flex-col gap-5">
                    <h1 className="text-white font-semibold text-2xl">Add Course</h1>
                    <div >
                        <RenderSteps/>
                    </div>
                </div>
                {/* Description Box */}
                <div className="flex flex-col gap-4 text-[#F1F2FF] bg-[#161D29] rounded-lg border-2 border-[#2C333F] py-4 px-7">
                    <p className="text-lg font-semibold">
                    ⚡Course Upload Tips
                    </p>
                    <ul className="flex flex-col gap-2 text-sm font-semibold list-disc">
                        {
                            courseTips.map((str,index) => {
                                return(
                                    <li key={index} className="">
                                       {str}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default AddCourses;