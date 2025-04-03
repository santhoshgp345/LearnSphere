import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/operations/authAPI.js";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


const LoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData,setFormData] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    const { email,password} = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]:e.target.value
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email,password,navigate));
    }

    return (
        <form
        onSubmit={handleOnSubmit}
        className="mt-6 flex flex-col w-[100%] gap-4"
        >
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
            <label className="w-full relative">
                <p className="text-[#F1F2FF]">
                    Password <sup className="text-red-700">*</sup>
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
                className="absolute bottom-4 right-4 text-2xl text-[#999DAA] z-10 cursor-pointer"
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
            <Link to="/forgot-password">
                    <p className="text-sm text-blue-400 text-end my-2">
                        Forgot Password ?
                    </p>
            </Link>

            <button 
            type="submit"
            className="mt-2 rounded-lg bg-yellow-400 py-2 px-4 text-lg text-black font-semibold">
                Login
            </button>

        </form>
    )
}

export default LoginForm;