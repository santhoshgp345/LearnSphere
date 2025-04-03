import { useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import {useDispatch, useSelector} from 'react-redux';
import { Link} from 'react-router-dom';
import { getResetPassToken } from '../services/operations/authAPI';

const ForgotPassword = () => {
    const dispatch = useDispatch();

    const [emailSent,setEmailSent] = useState(false);
    const [email,setEmail] = useState("");

    const {loading} = useSelector((state) => state.auth);

    const handleOnSubmit = (e) => {
        e.preventDefault()

        dispatch(getResetPassToken(email,setEmailSent));
    }


    return(
        <div className="w-[100vw] h-[80vh] p-8 flex items-center justify-center">
            {
                loading ? (
                    <div className="spinner"></div>
                ) : (
                    <div className='w-[85vw] md:w-[30vw] mx-auto p-6 pb-8 flex flex-col gap-3 text-[#F1F2FF] border-2 border-[#FFFFFF2E] rounded-lg'>
                        <h1 className='text-3xl font-semibold'>
                            {
                                emailSent ? "Check Email" : "Reset your Password"
                            }
                        </h1>
                        <p className='text-[#AFB2BF]'>
                            {
                                emailSent ? `We have sent the reset email to ${email}` 
                                : "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                            }
                        </p>
                        <form className='w-[100%] my-2 flex flex-col gap-2'
                        onSubmit={handleOnSubmit}
                        >
                            {
                                !emailSent && (
                                    <label className="w-full">
                                        <p className="text-[#F1F2FF]">
                                            Email Address <sup className="text-red-700">*</sup>
                                        </p>
                                        <input
                                        required 
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter Email address"
                                        style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                                        className="w-full rounded-lg bg-[#161D29] px-4 py-2 c border-none my-2"
                                        />
                                    </label>
                                )
                            }
                            <button 
                            type='submit'
                            className='w-[100%] bg-yellow-400 text-black py-2 my-4 font-semibold rounded-lg'
                            >
                                {
                                    emailSent ? "Resend email" : "Reset Password"
                                }
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

export default ForgotPassword;