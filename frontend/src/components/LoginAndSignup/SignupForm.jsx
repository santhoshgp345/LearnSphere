import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOtp} from "../../services/operations/authAPI";
import {setSignupData} from "../../slices/authSlice.js";
import data from "../../data/countryCodes.json";
import { AiOutlineEyeInvisible,AiOutlineEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import toast from "react-hot-toast";

const SignupForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {signupData} = useSelector((state) => state.auth);

    const [formData,setFormData] = useState({
        accountType:"Student",
        firstName:"",
        lastName:"",
        email:"",
        countryCode:"+91",
        contactNo:"",
        password:"",
        confirmPassword:"",
        otp:null
    })

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPass,setShowConfirmPass] = useState(false);

    const { accountType,firstName,lastName,email,countryCode,contactNo,password,confirmPassword,otp} = formData;
    // console.log("Form Data :: ",formData);

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]:e.target.value
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()

        if (!firstName || !lastName || !email || !contactNo || !password || !confirmPassword) {
            toast.error("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        dispatch(setSignupData(formData));
        // console.log("FORM DATA : ",formData)
        // console.log("SIGNUP DATA : ",signupData);  // this signupData updated after useEffect action

        dispatch(sendOtp(email,navigate));

    }

    useEffect(() => {
        // console.log("signupData has been updated", signupData);
    }, [signupData]);

    return (
        <form
        onSubmit={handleOnSubmit}
        className="mt-4 flex flex-col w-[100%] gap-2 text-sm text-white"
        >
            <div className="max-w-max bg-[#161D29] flex flex-row gap-1 items-center rounded-3xl p-1 cursor-pointer border-b-2 border-[#FFFFFF2E]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="radio"
                    name="accountType"
                    value="Student"
                    onChange={handleOnChange}
                    className="hidden" 
                />
                <span className={`px-4 py-2 rounded-3xl cursor-pointer ${accountType === "Student" ? "bg-[#000814] text-white" : "text-[#999DAA]"}`}>
                    Student
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="radio"
                    name="accountType"
                    value="Instructor"
                    onChange={handleOnChange}
                    className="hidden"
                />
                <span className={`px-4 py-2 rounded-3xl cursor-pointer ${accountType === "Instructor" ? "bg-[#000814] text-white" : "text-[#999DAA]"}`}>
                    Instructor
                </span>
              </label>
                
            </div>

            <div className="w-[100%] flex flex-row items-center justify-between mt-4">
                <label className="w-[45%]">
                    <p className="text-[#F1F2FF]">
                        First Name <sup className="text-red-700">*</sup>
                    </p>
                    <input
                    required 
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={handleOnChange}
                    placeholder="Enter First Name"
                    style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                    className="w-full rounded-lg bg-[#161D29] px-4 py-2 text-[#999DAA] border-none my-2"
                    />
                </label>

                <label className="w-[45%]">
                    <p className="text-[#F1F2FF]">
                        Last Name <sup className="text-red-700">*</sup>
                    </p>
                    <input
                    required 
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={handleOnChange}
                    placeholder="Enter Last Name"
                    style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                    className="w-full rounded-lg bg-[#161D29] px-4 py-2 text-[#999DAA] border-none my-2"
                    />
                </label>
            </div>

            <label className="w-full">
                <p className="text-[#F1F2FF]">
                    Email Address <sup className="text-red-700">*</sup>
                </p>
                <input
                required 
                type="text"
                name="email"
                value={email}
                onChange={handleOnChange}
                placeholder="Enter Email address"
                style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                className="w-full rounded-lg bg-[#161D29] px-4 py-2 text-[#999DAA] border-none my-2"
                />
            </label>

            <label className="w-full">
                <p className="text-[#F1F2FF]">
                    Phone Number <sup className="text-red-700">*</sup>
                </p>
                <div className="w-[100%] flex flex-row justify-between items-center">
                    {/* Country code Dropdown */}
                    <select
                        name="countryCode"
                        value={countryCode}
                        onChange={handleOnChange}
                        style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                        className="w-[30%] rounded-xl bg-[#161D29] pl-3 py-2 text-[#999DAA] border-none my-2"
                    >
                    {
                        data.map((codes,index) => {
                            return(
                                <option key={index} value={codes.code}>{codes.country}</option>
                            )
                        })
                    }
                    </select>

                    {/* Contact Number Input */}
                    <input
                    required 
                    type="text"
                    name="contactNo"
                    value={contactNo}
                    onChange={handleOnChange}
                    placeholder="Enter Phone Number"
                    style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                    className="w-[65%] rounded-lg bg-[#161D29] px-4 py-2 text-[#999DAA] border-none my-2"
                    />

                </div>
            </label>

            <div className="w-[100%] flex flex-row items-center justify-between">
                <label className="w-[47%] relative">
                    <p className="text-[#F1F2FF]">
                        Create Password <sup className="text-red-700">*</sup>
                    </p>
                    <input
                    required 
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    placeholder="Enter Password"
                    style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                    className="w-full rounded-lg bg-[#161D29] px-4 py-2 text-[#999DAA] border-none my-2"
                    />
                    <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute bottom-4 right-3 text-xl text-[#999DAA] z-10 cursor-pointer"
                    >
                        {
                            showPassword ? (
                                <AiOutlineEyeInvisible/>
                            ) : (
                                <AiOutlineEye/>
                            )
                        }
                    </span>
                </label>

                <label className="w-[47%] relative">
                    <p className="text-[#F1F2FF]">
                        Confirm Password <sup className="text-red-700">*</sup>
                    </p>
                    <input
                    required 
                    type={showConfirmPass ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleOnChange}
                    placeholder="Enter Password"
                    style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                    className="w-full rounded-lg bg-[#161D29] px-4 py-2 text-[#999DAA] border-none my-2"
                    />
                    <span
                    onClick={() => setShowConfirmPass((prev) => !prev)}
                    className="absolute bottom-4 right-3 text-xl text-[#999DAA] z-10 cursor-pointer"
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
            </div>

            <button 
            type="submit"
            className="mt-3 rounded-lg bg-yellow-400 py-2 px-4 text-lg text-black font-semibold">
                Create Account
            </button>

            <div className="w-[100%] flex flex-row items-center justify-around px-2 my-2 text-[#2C333F]">
                <hr className="w-[42%] border-[#2C333F]" />
                <span>OR</span>
                <hr className="w-[42%] border-[#2C333F]" />
            </div>

            <div className="flex flex-row justify-around items-center text-2xl">
                <a href="http://www.google.com" className="flex flex-row items-center gap-2 text-center px-6 py-2 border-2 border-[#2C333F] rounded-lg"><FcGoogle/> <p> Google</p></a>
                <a href="http://www.facebook.com" className="flex flex-row items-center gap-2 text-center px-6 py-2 border-2 border-[#2C333F] rounded-lg"><FaFacebook className="text-blue-500"/> <p> Facebook</p></a>
            </div>


        </form>
    )
}

export default SignupForm;