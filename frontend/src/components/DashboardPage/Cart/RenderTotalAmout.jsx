import { useSelector } from "react-redux";

const RenderTotalAmount = () => {

    const {total,cart} = useSelector((state) => state.cart);

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id)
        // console.log("Courses to Buy : ",courses);

        // TODO : Payment API integration
    }

    return (
        <div className="flex flex-col h-[10rem] gap-10 p-5 items-center bg-[#161D29] border-2 border-[#2C333F] w-[12rem]">
            <div className="flex flex-row items-center gap-3">
            <p className="text-[#999DAA] font-bold">Total :</p>
            <div className="text-xl font-semibold text-yellow-400">
                {`Rs. ${total}`}
            </div>
            </div>
            <div className="w-[100%]">
                <button 
                onClick={handleBuyCourse}
                className="w-[100%] py-2 text-center bg-yellow-400 text-black font-bold rounded-lg">Buy Now</button>
            </div>
        </div>
    )
}

export default RenderTotalAmount;