import { IoStar } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../slices/cartSlice";
import ReactStars from "react-rating-stars-component";
import { RiDeleteBin6Line } from "react-icons/ri";

const RenderCartCourses = () => {
    const dispatch = useDispatch();

    const { cart, total} = useSelector((state) => state.cart);


    return (
        <div className="flex flex-col gap-3 py-6 px-8">
            {
                cart.map((course,index) => {
                    return(
                        <div key={index} className="flex flex-row border-b-2 border-[#2C333F] p-4 gap-6">
                            <div className="flex flex-row gap-6">
                                <img 
                                className="rounded-lg"
                                src={course?.thumbnail} alt="course.img" />
                                <div className="flex flex-col gap-2">
                                    <p className="text-lg">{course?.courseName}</p>
                                    <p>{course?.category?.name}</p>
                                    <div className="flex items-center gap-2">
                                        <span>4.5</span>
                                        <ReactStars
                                        count={5}
                                        edit={false}
                                        size={20}
                                        activeColor="#ffd700"
                                        emptyIcon={<IoStar/>}
                                        fullIcon={<IoStar/>}
                                        />
                                        <span>{`(${course?.ratingAndReviews?.length} Reviews)`}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col justify-between h-[100%]">
                                <button 
                                onClick={() => dispatch(removeFromCart(course._id))}
                                className="py-2 px-4 text-red-400 flex flex-row items-center gap-1 bg-[#161D29] border-2 border-[#2C333F] rounded-lg"
                                >
                                    <RiDeleteBin6Line/><p>Remove</p>
                                </button>
                                <p className="text-yellow-400 font-semibold text-2xl">{`Rs. ${course?.price}`}</p>

                            </div>
                            
                        </div>
                        
                    )
                })
            }
        </div>
    )
}

export default RenderCartCourses;