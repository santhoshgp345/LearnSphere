// VideoDetailsSidebar.jsx
import { useEffect, useState } from "react"
import { BsChevronDown, BsChevronUp } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from "react-redux"
import IconBtn from "../Common/IconBtn"

export default function VideoDetailsSidebar({ setReviewModal, toggleSection, showSubsectionDetails, expandedSections, selectedSubsection }) {
  const [activeStatus, setActiveStatus] = useState(null)
  const { courseSectionData, courseEntireData, totalNoOfLectures, completedLectures } = useSelector((state) => state.viewCourse)

  return (
    <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
      <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-300">
        <div className="flex w-full items-center justify-between">
          <div className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-slate-600 p-1 text-richblack-300 hover:scale-90" title="Back">
            <IoIosArrowBack size={25} />
          </div>
          <IconBtn text="Add Review" customClasses="ml-auto" onclick={() => setReviewModal(true)} />
        </div>
        <div className="flex flex-col">
          <p className="text-white">{courseEntireData?.courseName}</p>
          <p className="text-sm font-semibold text-richblack-300">{completedLectures?.length} / {totalNoOfLectures}</p>
        </div>
      </div>
      <div className="h-[calc(100vh - 5rem)] overflow-y-auto text-white">
        {courseSectionData.map((course) => (
          <div key={course._id} className="mt-2 cursor-pointer text-sm text-richblack-300">
            <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4" onClick={() => toggleSection(course._id)}>
              <div className="w-[70%] font-semibold">{course?.sectionName}</div>
              <div className="flex items-center gap-3">
                <span className="transition-all duration-500">
                  {expandedSections[course._id] ? <BsChevronUp /> : <BsChevronDown />}
                </span>
              </div>
            </div>
            {expandedSections[course._id] && (
              <div className="transition-[height] duration-500 ease-in-out">
                {course.subSection.map((topic) => (
                  <div key={topic._id} className={`flex gap-3 px-5 py-2 ${selectedSubsection?._id === topic._id ? "bg-yellow-300 font-semibold text-black" : "hover:bg-richblack-900"}`} onClick={() => showSubsectionDetails(topic)}>
                    <input type="checkbox" checked={completedLectures.includes(topic?._id)} onChange={() => {}} />
                    {topic.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
