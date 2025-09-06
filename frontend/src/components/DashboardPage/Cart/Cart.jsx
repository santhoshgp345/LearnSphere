import { useSelector } from "react-redux";
import RenderTotalAmount from "./RenderTotalAmout";
import RenderCartCourses from "./RenderCartCourses";

const Cart = () => {

    const { cartItems} = useSelector((state) => state.cart);

    return(
        <div className="w-[100%] flex flex-col gap-5">
            <h1 className="text-2xl text-white font-semibold">
                My Cart
            </h1>

            <p className="text-xl text-[#6E727F]">{cartItems} Courses in Cart</p>

            {
                cartItems > 0 ? (
                    <div className="w-[100%] flex flex-row justify-between gap-5 text-[white]">
                        <RenderCartCourses/>
                        <RenderTotalAmount/>
                    </div>
                ) : (
                    <div className="h-[50vh] flex items-center justify-center text-xl text-red-500 font-semibold text-center">
                        Empty Cart . . .
                    </div>
                )
            }

            

        </div>
    )
}
export default Cart;