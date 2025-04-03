import toast from "react-hot-toast";
import {apiConnector} from "../apiconnector.js"
import { setLoading } from "../../slices/authSlice";
import { categories, courseEndpoints, reviewsEndpoints } from "../APIs.js";

const {
    CREATE_COURSE_API,
    GET_ALL_COURSE_API,
    GET_SINGLE_COURSE_API,
    EDIT_COURSE_API,
    DELETE_COURSE_API,
    GET_INSTRUCTOR_COURSES,
    CREATE_SECTION_API,
    UPDATE_SECTION_API,
    DELETE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SUBSECTION_API,
} = courseEndpoints;

const {CATEGORIES_API} = categories;

const {CREATE_RATING_API} = reviewsEndpoints;

export async function fetchCategories(){
    try{
      // console.log("Fetch Categories : ",CATEGORIES_API)
      const result = await apiConnector("GET",CATEGORIES_API);
      // console.log("Printing category response : ",result.data.Categories);

      if(!result?.data?.success){
        throw new Error("Could not fetch Course Categories");
      }

      return result?.data?.Categories;
  }catch(err){
      console.log("Catalog list not fetched");
      toast.error(err.message);
      return [];
  }
  
}

export function getAllCourses() {
  return async (dispatch) => {
    const toastId = toast.loading("Fetching Courses...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("GET", GET_ALL_COURSE_API);
      // console.log("Get All Courses API Response: ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Courses Fetched Successfully");
      return response?.data?.courses;

    } catch (err) {
      console.error("Get All Courses API Error:", err);
      toast.error("Failed to fetch courses");
      return [];
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}


export const addCourseDetails = async (token,formData) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    // console.log("object7")
    // console.log(formData.get("thumbnailImage"));
    const response = await apiConnector("POST", CREATE_COURSE_API, formData, {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`
    })
    // console.log("CREATE COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Course Details")
    } 
    toast.success("Course Details Added Successfully")
    result = response?.data?.course

    // console.log("Result from Backend Add : ",result)
  } catch (error) {
    console.log("CREATE COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


// edit the course details
export const editCourseDetails = async (token,data) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    // console.log("Data send to edit : ",data)
    const response = await apiConnector("POST", EDIT_COURSE_API, data,{
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`
    })
    // console.log("EDIT COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details")
    }
    toast.success("Course Details Updated Successfully")
    result = response?.data?.course
  } catch (error) {
    console.log("EDIT COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// create a section
export const createSection = async (data,token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    // console.log("create Section API send : ",data)
    // console.log("Token : ",token)
    //console.log("API URL: ", CREATE_SECTION_API);

    const response = await apiConnector("POST", CREATE_SECTION_API, data,{
      "Authorization": `Bearer ${token}`,
    })
    // console.log("CREATE SECTION API RESPONSE............", response)
    // console.log("create section res : ",response?.data)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Section")
    }
    toast.success("Course Section Created")
    
    result = response?.data?.course
  } catch (error) {
    console.log("CREATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// create a subsection
export const createSubSection = async (data,token) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    // console.log("Data send inside API :",data)
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data,{
      "Authorization": `Bearer ${token}`,
      // "Content-Type": "multipart/form-data",
    });

    // console.log("CREATE SUB-SECTION API RESPONSE:", response?.data);

    if (!response?.data?.success) {
      throw new Error("Could Not Add Lecture");
    }

    toast.success("Lecture Added");
    result = response?.data?.course // 🔹 Get updated course details

  } catch (error) {
    console.log("CREATE SUB-SECTION API ERROR:", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};


// update a section
export const updateSection = async (data,token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    //console.log("Data to edit section : ",data)
    const response = await apiConnector("PUT", UPDATE_SECTION_API, data,{
      "Authorization": `Bearer ${token}`
    })
    //console.log("UPDATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Section")
    }
    toast.success("Course Section Updated")
    result = response?.data?.course
  } catch (error) {
    console.log("UPDATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// update a subsection
export const updateSubSection = async (data) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data)
    //console.log("UPDATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Lecture")
    }
    toast.success("Lecture Updated")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// delete a section
export const deleteSection = async (data,token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    // console.log("data",data);
    const response = await apiConnector("DELETE", DELETE_SECTION_API, data,{
      "Authorization": `Bearer ${token}`,
    })
    // console.log("DELETE SECTION API RESPONSE............", response?.data)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section")
    }
    toast.success("Course Section Deleted")
    result = response?.data?.course
  } catch (error) {
    console.log("DELETE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}
// delete a subsection
export const deleteSubSection = async (data) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data)
    // console.log("DELETE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture")
    }
    toast.success("Lecture Deleted")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// fetching all courses under a specific instructor
export const fetchInstructorCourses = async (token,user) => {
  let result = []
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_COURSES,user,{
      "Authorization": `Bearer ${token}`
    });
    // console.log("INSTRUCTOR COURSES API RESPONSE............", response?.data?.courses)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructor Courses")
    }
    result = response?.data?.courses
    
  } catch (error) {
    console.log("INSTRUCTOR COURSES API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// delete a course
export const deleteCourse = async (token,courseId) => {
  const toastId = toast.loading("Loading...")
  try {
    // console.log(data);
    const response = await apiConnector("DELETE", DELETE_COURSE_API, {courseId},{
      "Authorization": `Bearer ${token}`
    })
    // console.log("DELETE COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course")
    }
    toast.success("Course Deleted")
  } catch (error) {
    console.log("DELETE COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}

// get full details of a course
export const getFullDetailsOfCourse = async (courseId) => {
  const toastId = toast.loading("Loading...")
  // dispatch(setLoading(true));
  let result = null
  try {
    // console.log("inside getfullcoursedetails")
    // console.log(courseId);
    const response = await apiConnector( "GET", `${GET_SINGLE_COURSE_API}?courseId=${courseId}`)
    // console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.course
    // console.log("Result frontend : ",result)
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  // dispatch(setLoading(false));
  return result
}

// mark a lecture as complete
export const markLectureAsComplete = async (data, token) => {
  let result = null
  // console.log("mark complete data", data)
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, 
      // { Authorization: `Bearer ${token}`,}
    )
    /*console.log(
      "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
      response
    )*/

    if (!response.data.success) {
      throw new Error(response.data.error)
    }
    toast.success("Lecture Completed")
    result = true
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
    toast.error(error.message)
    result = false
  }
  toast.dismiss(toastId)
  return result
}

// create a rating for course
export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let success = false
  try {
    // console.log("Data send to review API ",data)
    const response = await apiConnector("POST", CREATE_RATING_API, data, 
      {Authorization: `Bearer ${token}`,}
  )
    // console.log("CREATE RATING API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Rating")
    }
    toast.success("Rating Created")
    success = true
  } catch (error) {
    success = false
    console.log("CREATE RATING API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return success
}
