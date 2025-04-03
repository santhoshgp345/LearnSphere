// ViewCourse.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CourseReviewModal from "../components/ViewCourse/CourseReviewModal";
import VideoDetailsSidebar from "../components/ViewCourse/VideoDetailsSidebar";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailAPI";
import { setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from "../slices/viewCourseSlice";

export default function ViewCourse() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const [courseData, setCourseData] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedSubsection, setSelectedSubsection] = useState(null);
  const [reviewModal, setReviewModal] = useState(false);

  useEffect(() => {
    (async () => {
      const fetchedCourseData = await getFullDetailsOfCourse(courseId);
      setCourseData(fetchedCourseData);
      dispatch(setCourseSectionData(fetchedCourseData?.courseContent));
      dispatch(setEntireCourseData(fetchedCourseData));

      let totalLectures = 0;
      fetchedCourseData?.courseContent.forEach((sec) => {
        totalLectures += sec.subSection.length;
      });
      dispatch(setTotalNoOfLectures(totalLectures));
    })();
  }, [courseId, dispatch]);

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const showSubsectionDetails = (sub) => {
    setSelectedSubsection(sub);
  };

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] flex-row">
      <VideoDetailsSidebar
        setReviewModal={setReviewModal}
        toggleSection={toggleSection}
        showSubsectionDetails={showSubsectionDetails}
        expandedSections={expandedSections}
        selectedSubsection={selectedSubsection}
      />
      
      <div className="flex flex-col p-6 w-full">
        <h1 className="text-3xl font-bold text-white">{courseData?.courseName}</h1>
        <div className="mt-6">
          {courseData?.courseContent?.map((section) => (
            <div key={section._id} className="mb-4 border border-gray-600 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-white">{section.sectionName}</h2>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => toggleSection(section._id)}>
                  {expandedSections[section._id] ? "Hide" : "View"}
                </button>
              </div>
              {expandedSections[section._id] && (
                <ul className="mt-2 space-y-2">
                  {section.subSection.map((sub) => (
                    <li key={sub._id} className="border p-3 bg-gray-800 rounded-md text-white cursor-pointer hover:bg-gray-700" onClick={() => showSubsectionDetails(sub)}>
                      {sub.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        {selectedSubsection && (
          <div className="mt-6 p-4 bg-gray-900 rounded-lg">
            <h2 className="text-2xl font-bold text-white">{selectedSubsection.title}</h2>
            <p className="text-gray-400">{selectedSubsection.description}</p>
            <div className="mt-4">
              <video controls src={selectedSubsection.videoUrl} className="w-full max-w-2xl rounded-lg" />
            </div>
          </div>
        )}
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </div>
  );
}
