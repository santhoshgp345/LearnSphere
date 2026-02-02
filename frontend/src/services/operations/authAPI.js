import toast from "react-hot-toast"
import { apiConnector } from "../apiconnector.js";
import { setToken,setLoading } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { endpoints,settingsEndpoints } from "../APIs.js";


const {
    DELETE_ACCOUNT_API
} = settingsEndpoints;

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API
} = endpoints;

// sendOTP API handler
export function sendOtp(email,navigate){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try{
            const response = await apiConnector("POST",SENDOTP_API,{
                email
            })
            // console.log("Send API response : ",response);
            // console.log(response.data.success)

            if(!response.data.success){
                throw new Error(response.data.message )
            }

            toast.success("OTP sent Successfully")
            navigate("/signup/verify-email")

        }catch(err){
            console.log("Send API Error....",err)
            toast.error("Could not send OTP")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)
        navigate("/signup/verify-email")
    }
}

// signup API handler
export function signup(
    accountType,
    firstName,
    lastName,
    email,
    countryCode,
    contactNo,
    password,
    confirmPassword,
    otp,
    navigate
){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST",SIGNUP_API,{
                accountType,
                firstName,
                lastName,
                email,
                countryCode,
                contactNo,
                password,
                confirmPassword,
                otp,
                navigate
            })
            // console.log("Signup API response : ",response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Signup Successful")
            navigate("/login")

        }catch(err){
            console.log("Signup API Error......", err);
            toast.error("Signup Failed")
            navigate("/signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

// login API handler
export function login(email,password,navigate){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST", LOGIN_API,{
                email,
                password
            })
            // console.log("Login API response : ",response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Login Successful")
            dispatch(setToken(response.data.token))
            // console.log("User Data : ",response.data.user)
            const userImage = response.data?.user?.image
                ? response.data.user.image
                : `https://api.dicebear.com/9.x/initials/svg?seed${response.data.user.firstName} ${response.data.user.lastName}`
            
            dispatch(setUser({...response.data.user,image: userImage}))
            localStorage.setItem("token",JSON.stringify(response.data.token));
            localStorage.setItem("user",JSON.stringify(response.data.user));

            navigate("/dashboard/my-profile")

        }catch(err){
            console.log("Login API Error.....",err)
            toast.error("Login Failed")
            navigate("/login")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

// logout API handler
export function logout(navigate){
    return async(dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        // dispatch(resetCart());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out");
        navigate("/")
    }
}

// reset Password token mail handler
export function  getResetPassToken(email,setEmailSent){
    return async(dispatch) => {
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST",RESETPASSTOKEN_API,{email})
            // console.log("Reset Password Token response :: ",response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Reset Email Sent")
            setEmailSent(true);

        }catch(err){
            console.log("Could not sent Reset Token");
            toast.error("Fail to sent Email")
        }
        dispatch(setLoading(false))
    }
} 

// update Password(using link send to mail)

export function updatePassword(password,confirmPassword,token,navigate){
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST",RESETPASSWORD_API,{
                password,
                confirmPassword,
                token
            })
            // console.log("Response on Updating Password : ",response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Password updated Successfully")
        }catch(err){
            console.log("Could not update Password")
            toast.error(err.response?.data?.message || "An error occurred")
        }
        dispatch(setLoading(false))
        navigate("/login")
    }
}

export function deleteProfile(user,token,navigate){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try{
        const response = await apiConnector("DELETE",DELETE_ACCOUNT_API,{user},{
            Authorization: `Bearer ${token}`,
            });
            // console.log("Delete API Response : ",response);

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            dispatch(setToken(null));
            dispatch(setUser(null));
            // dispatch(resetCart());
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            toast.success("Account Deleted");

        }catch(err){
            console.log("Deletion API Error.....",err)
            toast.error("Profile Deletion Failed")
            navigate("/dashboard/my-profile")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}
