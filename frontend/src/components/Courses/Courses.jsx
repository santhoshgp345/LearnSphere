import { useEffect, useState } from "react";
import { getAllCourses } from "../../services/operations/courseDetailAPI"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Courses = () => {
    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);

    const fetchAllCourses = async () => {
        setLoading(true);
        const courseData = await dispatch(getAllCourses());
        if (courseData) {
            setCourses(courseData); 
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAllCourses();
    }, []);

    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-[80%] p-8">
                <h1 className="text-white font-semibold text-center text-2xl my-6">
                    All Courses
                </h1>
                <div className="flex flex-wrap justify-center gap-7">
                    {courses && token ? (
                        courses.map((course) => (
                            <div
                                key={course._id}
                                className="flex flex-col text-white w-[30rem] p-4 bg-slate-700 border-2 border-slate-500 rounded-lg 
                                        transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl cursor-pointer"
                                onClick={() => navigate(`/courses/${course._id}`)}
                            >
                                <img
                                    src={course.thumbnail}
                                    className="rounded-lg my-4 w-full h-48 object-cover"
                                    alt="Course Thumbnail"
                                />
                                <div className="text-xl font-bold m-4">
                                    {course.courseName}
                                </div>
                                <p className="font-semibold mx-4 line-clamp-2">
                                    {course.courseDescription}
                                </p>
                                <div className="flex justify-between items-center mx-4">
                                    <p className="font-semibold text-yellow-400 text-xl my-2">
                                        Rs. {course.price}.00 /-
                                    </p>
                                    <p>{course.studentsEnrolled?.length} Students Enrolled</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="font-semibold text-lg text-red-500">
                            No Courses Created Yet..
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Courses;
