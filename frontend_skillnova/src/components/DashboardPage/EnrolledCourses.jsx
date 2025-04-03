// import { BiDotsVerticalRounded } from "react-icons/bi"
import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { userEnrolledCourses } from "../../services/operations/profileApi"

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const [enrolledCourseProgress,setCourseProgress] = useState(null);

  const getEnrolledCourses = async () => {
    try {
      const res = await userEnrolledCourses(user._id, token);
      // console.log("Response from Enrolled Course : ",res);
      setEnrolledCourses(res?.courses);
      setCourseProgress(res?.courseProgress);
      // console.log("Enrolled Courses :",enrolledCourses)
    } catch (error) {
      console.log("Could not fetch enrolled courses.")
    }
  };
  useEffect(() => {
    getEnrolledCourses();
  }, [])

  return (
    <>
      <div className="text-3xl text-white">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-red-500">
          You have not enrolled in any course yet.
          {/* TODO: Modify this Empty State */}
        </p>
      ) : (
        <div className="w-[90%] my-8 text-white">
          {/* Headings */}
          <div className="flex rounded-t-lg bg-richblack-500">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>
          {/* Course Names */}
          {enrolledCourses?.map((course, i, arr) => (
            <div
              className={`flex items-center border border-richblack-700 rounded-lg my-4`}
              key={i}
            >
              <div
                className="flex w-[45%] cursor-pointer items-center gap-6 px-5 py-5"
                onClick={() =>  {
                    if (course?.courseContent?.length > 0 && course.courseContent[0]?.subSection?.length > 0) {
                      navigate(
                        `/view-course/${course._id}`
                      )
                    } else {
                      console.warn("Course content or subsections are missing.");
                      alert("This course does not have any content available yet.");
                    }
                  }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className=" w-40 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{course.courseName}</p>
                  <p className="text-xs text-richblack-300">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                <p>Progress: {enrolledCourseProgress?.completeVideo || 0}%</p>
                <ProgressBar
                  completed={enrolledCourseProgress?.completeVideo || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}