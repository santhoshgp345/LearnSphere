import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import codeData from "../../data/countryCodes.json";
import { apiConnector } from "../../services/apiconnector.js"

const ContactUsForm = () => {

    const [loading,setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async(data) => {
        // console.log("Contact Us Data : ",data);
        setLoading(true);
        try{
            // const response = await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data);
            const response = {status:"OK"}
            // console.log("Contact Form Response : ",response)

        }catch(err){
            console.log("Error",err.message);
        }
        setLoading(false);
    }

    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                countryCode:"+91",
                phoneNo:""
            })
        }
    },[reset,isSubmitSuccessful]);

    return(
        <form 
        className="w-full flex flex-col gap-2 justify-between text-sm p-4 mt-4"
        onSubmit={handleSubmit(submitContactForm)}
        >
            <div className="flex flex-row justify-between items-center">
                <label htmlFor="firstname" className="w-[45%]">
                    <p className="text-[#F1F2FF]">
                        First Name <sup className="text-red-700">*</sup>
                    </p>
                    <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="Enter First Name"
                    {...register("firstname",{required:true})}
                    style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                    className="w-full rounded-lg bg-[#161D29] px-4 py-2 text-[#999DAA] border-none my-2"
                    />
                    {
                        errors.firstname && (
                            <span className="text-red-500">
                                Please enter your name
                            </span>
                        )
                    }
                </label>

                <label htmlFor="lastname" className="w-[45%]">
                    <p className="text-[#F1F2FF]">
                        Last Name
                    </p>
                    <input
                    required 
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="Enter Last Name"
                    {...register("lastname")}
                    style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                    className="w-full rounded-lg bg-[#161D29] px-4 py-2 text-[#999DAA] border-none my-2"
                    />
                    
                </label>
            </div>

            <label htmlFor="email" className="w-full">
                <p className="text-[#F1F2FF] text-sm">
                    Email Address <sup className="text-red-700">*</sup>
                </p>
                <input
                type="text"
                name="email"
                id="email"
                placeholder="Enter Email address"
                {...register("email",{required:true})}
                style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                className="w-full rounded-lg bg-[#161D29] px-4 py-2 text-[#999DAA] border-none my-2"
                />
                {
                    errors.email && (
                        <span className="text-red-500">
                            Please Enter Email
                        </span>
                    )
                }
            </label>

            <label htmlFor="phoneNo" className="w-full">
                <p className="text-[#F1F2FF]">
                    Phone Number <sup className="text-red-700">*</sup>
                </p>
                <div className="w-[100%] flex flex-row justify-between items-center">
                    {/* Country code Dropdown */}
                    <select
                        name="countryCode"
                        {...register("countryCode",{required:true})}
                        style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                        className="w-[30%] rounded-xl bg-[#161D29] pl-3 py-2 text-[#999DAA] border-none my-2"
                    >
                    {
                        codeData.map((codes,index) => {
                            return(
                                <option key={index} value={codes.code}>{codes.country}</option>
                            )
                        })
                    }
                    </select>

                    {/* Contact Number Input */}
                    <input
                    type="text"
                    name="phoneNo"
                    id="phoneNo"
                    {...register("phoneNo",{required:true,
                        maxLength:{value:10},
                        minLength:{value:8}
                    })}
                    placeholder="Enter Phone Number"
                    style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                    className="w-[65%] rounded-lg bg-[#161D29] px-4 py-2 text-[#999DAA] border-none my-2"
                    />
                    
                </div>
                {
                    errors.phoneNo && (
                        <span className="text-red-500">
                            Please Enter Contact Number
                        </span>
                    )
                }
            </label>

            <label htmlFor="message" className="w-[100%]">
                <p className="text-[#F1F2FF] text-sm">
                    Message <sup className="text-red-700">*</sup>
                </p>
                <textarea 
                name="message" 
                id="message"
                rows="5"
                placeholder="Enter Feedback"
                {...register("message",{required:true})}
                style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                className="w-full rounded-lg bg-[#161D29] px-4 py-2 text-[#999DAA] border-none my-2"
                />
                {
                    errors.message && (
                        <span className="text-red-500">
                            Please Enter some feedback
                        </span>
                    )
                }
            </label>

            <button 
            type="submit"
            className="mt-3 rounded-lg bg-yellow-400 py-2 px-4 text-lg text-black font-semibold">
                Send Message
            </button>

        </form>
    )
}

export default ContactUsForm;