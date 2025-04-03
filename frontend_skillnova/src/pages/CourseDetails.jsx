import React, { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ConfirmationModal from "../components/Common/ConfirmationModal";
import Footer from "../components/Footer/Footer";
import RatingStars from "../components/ReviewSection/RatingStars";
import CourseAccordionBar from "../components/Courses/CourseAccordionBar";
import CourseDetailsCard from "../components/Courses/CourseDetailsCard";
import { formatDate } from "../services/formatDate";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailAPI";
import { buyCourse } from "../services/operations/studentFeatureAPI";
import GetAvgRating from "../utils/avgRating";
import Error from "./Error";

function CourseDetails() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [response, setResponse] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  const [isActive, setIsActive] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getFullDetailsOfCourse(courseId);
        setResponse(res|| null);
      } catch (error) {
        console.error("Could not fetch Course Details", error);
      }
    })();
  }, [courseId]);

  useEffect(() => {
    if (response?.ratingAndReviews) {
      const count = GetAvgRating(response.ratingAndReviews);
      setAvgReviewCount(isNaN(count) ? 0 : count);
    }
  }, [response]);

  useEffect(() => {
    let lectures = 0;
    response?.courseContent?.forEach((sec) => {
      lectures += sec?.subSection?.length || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [response]);

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e !== id)
    );
  };

  if (loading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!response) {
    return <Error />;
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews = [],
    instructor,
    studentsEnrolled = [],
    createdAt,
  } = response;

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  if (paymentLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full bg-richblack-800">
        <div className="mx-auto box-content px-4 lg:w-[75%] 2xl:relative">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img
                src={thumbnail}
                alt="course thumbnail"
                className="aspect-auto w-full"
              />
            </div>
            <div className="z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-white">
              <div>
                <p className="text-4xl font-bold sm:text-[42px]">
                  {courseName}
                </p>
              </div>
              <p className="text-richblack-200">{courseDescription}</p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-500">{avgReviewCount || 0}</span>
                <RatingStars Review_Count={avgReviewCount || 0} Star_Size={24} />
                <span className="text-yellow-400">
                  ({ratingAndReviews.length || 0} reviews)
                </span>
                <span className="text-yellow-400">
                  {studentsEnrolled.length || 0} students enrolled
                </span>
              </div>
              <p className="text-white">
                Created By {`${instructor?.firstName} ${instructor?.lastName}`}
              </p>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2 text-white">
                  <BiInfoCircle /> Created at {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2 text-white">
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-800 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-300">
                Rs. {price || "N/A"}
              </p>
              <button className="yellowButton bg-yellow-400 rounded-md text-black" onClick={handleBuyCourse}>
                Buy Now
              </button>
            </div>
          </div>
          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute lg:block">
            <CourseDetailsCard
              course={response}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseDetails;
