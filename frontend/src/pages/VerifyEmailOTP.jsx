import { useDispatch, useSelector } from "react-redux";
import OtpInput from 'react-otp-input';
import { useState ,useEffect} from "react";
import { sendOtp, signup } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import {setSignupData} from "../slices/authSlice.js";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const VerifyEmailOTP = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {signupData,loading} = useSelector((state) => state.auth);

    const {
        accountType,
        firstName,
        lastName,
        email,
        countryCode,
        contactNo,
        password,
        confirmPassword,
        otp
    } = signupData || {};

    const [enteredOtp,setEnteredOtp] = useState(null);

    // console.log("Entered OTP : ",enteredOtp);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        
        dispatch(setSignupData({
            ...signupData,
            otp: enteredOtp.toString()
        }));

        dispatch(signup(accountType,firstName,lastName,email,countryCode,contactNo,password,confirmPassword,enteredOtp,navigate));
    }
    useEffect(() => {
        // console.log("Data : ",accountType,firstName,lastName,email,countryCode,contactNo,password,confirmPassword,enteredOtp);
    },[])

    return (
        <div className="w-[100vw] h-[80vh] p-8 flex items-center justify-center">
            {
                loading ? (
                    <div className="spinner"></div>
                ) : (
                    <div className="w-[85vw] md:w-[30vw] mx-auto p-6 pb-8 flex flex-col gap-3 text-[#F1F2FF] border-2 border-[#FFFFFF2E] rounded-lg">
                        <h1 className='text-3xl font-semibold'>
                            Verify Email
                        </h1>
                        <p className="text-[#AFB2BF]">
                        A verification code has been sent to you. Enter the code below
                        </p>
                        <form className='w-[100%] my-2 flex flex-col gap-3'
                        onSubmit={handleOnSubmit}
                        >
                            <div className="w-[100%] flex flex-row justify-between gap-2">
                            <OtpInput
                                inputType="text"
                                value={enteredOtp}
                                onChange={setEnteredOtp}
                                numInputs={6}
                                skipDefaultStyles={true}
                                
                                //renderSeparator={<span>-</span>}
                                renderInput={(props) => <input {...props}
                                    type="text"
                                    placeholder="-"
                                    className="w-[80%] p-1 text-center text-lg font-semibold text-[#F1F2FF] bg-[#161D29] border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />}
                            />
                            </div>

                            <button
                            type="submit"
                            className="w-[100%] bg-yellow-400 text-black py-2 my-4 font-semibold rounded-lg"
                            >
                                Verify Email
                            </button>

                        </form>
                        <div className="w-[100%] flex flex-row justify-between items-center px-2">
                            <Link to="/login">
                                <span className='px-2 text-sm text-[#F1F2FF] flex flex-row gap-2 items-center'>
                                    <FaArrowLeftLong/><p>Back to login</p>
                                </span>
                            </Link>
                            <button 
                            onClick={() => dispatch(sendOtp(email,navigate))}
                            className="text-sm text-sky-500">
                                   Resend it?
                            </button>
                            
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default VerifyEmailOTP;