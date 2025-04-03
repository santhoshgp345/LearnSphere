import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "../../App.css";

// Icons
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

// API Functions
import { apiConnector } from "../../services/apiconnector.js";
import { reviewsEndpoints } from "../../services/APIs";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await apiConnector(
          "GET",
          reviewsEndpoints.REVIEWS_DETAILS_API
        );
        // console.log("Reviews API response:", res);

        if (res?.data?.success) {
          // console.log("Setting reviews state:", res?.data?.data);
          setReviews(res?.data?.data);
        }
      } catch (error) {
        console.error(" Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  const shouldLoop = reviews.length >= 3; // ✅ Loop sirf tab chale jab 3 ya usse zyada reviews ho

  return (
    <div className="text-white">
      <div className="my-[50px] max-w-maxContentTab lg:max-w-maxContent">
        {reviews.length === 0 ? (
          <p className="text-center text-gray-300">No reviews available</p>
        ) : reviews.length < 3 ? (
          // ✅ Jab 1 ya 2 reviews ho, tab Swiper nahi chalega, bas static show karega
          <div className="flex gap-4 justify-center">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 bg-gray-700 p-3 text-[14px] text-richblack-25 rounded-lg w-[300px]"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      review?.user?.image ||
                      `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                    }
                    alt="User Avatar"
                    className="h-10 w-10 rounded-full object-cover border border-richblack-400"
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-richblack-5">
                      {`${review?.user?.firstName} ${review?.user?.lastName}`}
                    </h1>
                    <h2 className="text-[12px] font-medium text-richblack-500">
                      {review?.course?.courseName}
                    </h2>
                  </div>
                </div>

                <p className="font-medium text-richblack-25">
                  {review?.review
                    ? review.review.split(" ").length > truncateWords
                      ? `${review.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ...`
                      : review.review
                    : "No review available."}
                </p>

                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-yellow-100">
                    {review.rating ? review.rating.toFixed(1) : "0.0"}
                  </h3>
                  <StarRatings
                    rating={review.rating || 0}
                    starRatedColor="#ffd700"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="2px"
                    name="rating"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          // ✅ Jab 3 ya usse zyada reviews ho, tabhi Swiper chalega
          <Swiper
            slidesPerView="auto" // ✅ Auto adjust for better UX
            spaceBetween={25}
            loop={true} // ✅ Proper infinite loop
            loopFillGroupWithBlank={true} // ✅ Prevents disappearing slides
            centeredSlides={false} // ✅ Normal alignment
            speed={1000} // ✅ Smooth transition speed
            autoplay={{
              delay: 2500, // ✅ 2.5 sec delay for better readability
              disableOnInteraction: false, // ✅ Autoplay continues even after swipe
            }}
            grabCursor={true} // ✅ Makes swiping feel more natural
            effect="slide" // ✅ No fancy effects, just smooth sliding
            loopedSlides={reviews.length} // ✅ Ensures correct number of looping slides
            modules={[Autoplay, FreeMode, Pagination]}
            className="w-full"
          >
            {reviews.map((review, i) => (
              <SwiperSlide key={i} className="w-[300px]">
                {/* ✅ Fixed width for better alignment */}
                <div className="flex flex-col gap-3 bg-gray-700 p-3 text-[14px] text-richblack-25 rounded-lg">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        review?.user?.image ||
                        `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt="User Avatar"
                      className="h-10 w-10 rounded-full object-cover border border-richblack-400"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5">
                        {`${review?.user?.firstName} ${review?.user?.lastName}`}
                      </h1>
                      <h2 className="text-[12px] font-medium text-richblack-500">
                        {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>

                  <p className="font-medium text-richblack-25">
                    {review?.review
                      ? review.review.split(" ").length > 15
                        ? `${review.review
                            .split(" ")
                            .slice(0, 15)
                            .join(" ")} ...`
                        : review.review
                      : "No review available."}
                  </p>

                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-yellow-100">
                      {review.rating ? review.rating.toFixed(1) : "0.0"}
                    </h3>
                    <StarRatings
                      rating={review.rating || 0}
                      starRatedColor="#ffd700"
                      numberOfStars={5}
                      starDimension="20px"
                      starSpacing="2px"
                      name="rating"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}

export default ReviewSlider;
