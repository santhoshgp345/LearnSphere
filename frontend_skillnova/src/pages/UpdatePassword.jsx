import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { updatePassword } from "../services/operations/authAPI";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const UpdatePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token} = useParams();
    const {loading} = useSelector((state) => state.auth);

    const [formData,setFormData] = useState({
        password:"",
        confirmPassword:""
    })

    const {password,confirmPassword} = formData;

    const [showNewPassword,setShowNewPassword] = useState(false);
    const [showConfirmPass,setShowConfirmPass] = useState(false);

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]:e.target.value
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            toast.error("New password & Confirm Password must be same")
            return;
        }

        dispatch(updatePassword(password,confirmPassword,token,navigate));
    }
    
    return(
        <div className="w-[100vw] h-[80vh] p-8 flex items-center justify-center">
            {
                loading ? (
                    <div className="spinner"></div>
                ) : (
                    <div className="w-[85vw] md:w-[30vw] mx-auto p-6 pb-8 flex flex-col gap-3 text-[#F1F2FF] border-2 border-[#FFFFFF2E] rounded-lg">
                        <h1 className='text-3xl font-semibold'>
                            Choose New Password
                        </h1>
                        <p className="text-[#AFB2BF]">
                        Almost done. Enter your new password and youre all set.
                        </p>
                        <form className='w-[100%] my-2 flex flex-col gap-3'
                        onSubmit={handleOnSubmit}
                        >
                            <label className="w-full relative">
                                <p className="text-[#F1F2FF]">
                                    New Password <sup className="text-red-700">*</sup>
                                </p>
                                <input
                                required 
                                type={showNewPassword ? "text" : "password"}
                                name="password"
                                value={password} 
                                onChange={handleOnChange}
                                placeholder="Enter Password"
                                style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                                className="w-full rounded-lg bg-[#161D29] px-4 py-2 text-[#999DAA] border-none my-2"
                                />
                                <span
                                onClick={() => setShowNewPassword((prev) => !prev)}
                                className="absolute bottom-4 right-4 text-2xl text-[#999DAA] z-10 cursor-pointer"
                                >
                                    {
                                        showNewPassword ? (
                                            <AiOutlineEyeInvisible/>
                                        ) : (
                                            <AiOutlineEye/>
                                        )
                                    }
                                </span>
                            </label>

                            <label className="w-full relative">
                                <p className="text-[#F1F2FF]">
                                    Confirm Password <sup className="text-red-700">*</sup>
                                </p>
                                <input
                                required 
                                type={showConfirmPass ? "text" : "password"}
                                name="confirmPassword"
                                value={confirmPassword} 
                                onChange={handleOnChange}
                                placeholder="Enter Password Again"
                                style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                                className="w-full rounded-lg bg-[#161D29] px-4 py-2 text-[#999DAA] border-none my-2"
                                />
                                <span
                                onClick={() => setShowConfirmPass((prev) => !prev)}
                                className="absolute bottom-4 right-4 text-2xl text-[#999DAA] z-10 cursor-pointer"
                                >
                                    {
                                        showConfirmPass ? (
                                            <AiOutlineEyeInvisible/>
                                        ) : (
                                            <AiOutlineEye/>
                                        )
                                    }
                                </span>
                            </label>

                            <button
                            type="submit"
                            className="w-[100%] bg-yellow-400 text-black py-2 my-4 font-semibold rounded-lg"
                            >
                                Reset Password
                            </button>

                            <Link to="/login">
                                <span className='px-2 text-sm text-[#F1F2FF] flex flex-row gap-2 items-center'>
                                    <FaArrowLeftLong/><p>Back to login</p>
                                </span>
                            </Link>
                        </form>
                    </div>
                )
            }
        </div>
    )
}

export default UpdatePassword;