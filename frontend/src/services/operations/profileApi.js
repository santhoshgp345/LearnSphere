import toast from "react-hot-toast"
import { apiConnector } from "../apiconnector.js";
import { setToken,setLoading } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { profileEndpoints, settingsEndpoints } from "../APIs";

const {
    USER_ENROLLED_COURSES,
    GET_USER_DETAILS_API,
    GET_INSTRUCTOR_DATA
} = profileEndpoints;

// const {
//     UPDATE_DISPLAY_PICTURE_API
// } = settingsEndpoints;

// get userData
export const fetchUserDetails = (email) => {
    return async (dispatch) => {
      try {
        // console.log("user")
        const response = await apiConnector("GET", `${GET_USER_DETAILS_API}?email=${email}`);
        
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
        
        const userData = response.data.userDetails;
        // console.log(userData);
  
        // Save user in Redux
        dispatch(setUser(userData));
        
        // console.log("object")
        localStorage.setItem("user", JSON.stringify(userData));
  
        return userData;
      } catch (error) {
        // dispatch(logout(navigate));
        console.error("Error fetching user details:", error);
        toast.error("Failed to fetch user details.");
      }
    };
  };

  // get user enrolled courses
  export async function userEnrolledCourses(userId, token) {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
      //console.log("UserId send to enrolled :",userId);
      //console.log("Token : ",token)
      const response = await apiConnector( "GET", USER_ENROLLED_COURSES,{userId},{
          Authorization: `Bearer ${token}`,
        }
      )
      // console.log("USER_ENROLLED_COURSES API RESPONSE............",response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response?.data?.user
    } catch (error) {
      console.log("USER_ENROLLED_COURSES API ERROR............", error)
      toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId)
    return result
  }
  


// get instructor data
export async function getInstructorData(token, userId) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try{
    // console.log("userId" ,userId)
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA,{userId},{
      "Authorization": `Bearer ${token}`
    })

    // console.log("GET_INSTRUCTOR_API_RESPONSE", response);
    result = response?.data?.instructor

  }
  catch(error) {
    console.log("GET_INSTRUCTOR_API ERROR", error);
    toast.error("Could not Get Instructor Data")
  }
  toast.dismiss(toastId);
  return result;
}