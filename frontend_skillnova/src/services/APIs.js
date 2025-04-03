
const BASE_URL = import.meta.env.VITE_BASE_URL

// categories API
export const categories = {
    CATEGORIES_API: BASE_URL + "/courses/get-all-categories",
}

// catalog page data
export const catalogData = {
    CATALOGPAGEDATA_API: BASE_URL + "/courses/get-categorisedCourses",
}

// User auth related APIs
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/verify-otp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password"
}

// settings page API 
export const settingsEndpoints = {
    UPDATE_PROFILE_API: BASE_URL + "/profile/update",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
    DELETE_ACCOUNT_API: BASE_URL + "/profile/delete",
}

// rating and reviews endpoints
export const reviewsEndpoints = {
    CREATE_RATING_API: BASE_URL + "/courses/create-reviews",
    REVIEWS_DETAILS_API: BASE_URL + "/courses/get-all-reviews"
}

// course Endpoints
export const courseEndpoints = {
    CREATE_COURSE_API: BASE_URL + "/courses/create-course",
    GET_ALL_COURSE_API: BASE_URL + "/courses/get-all-courses",
    GET_SINGLE_COURSE_API: BASE_URL + "/courses/get-course-detail",
    EDIT_COURSE_API: BASE_URL + "/courses/edit-course",
    GET_INSTRUCTOR_COURSES: BASE_URL + "/courses/get-instructor-courses",
    DELETE_COURSE_API: BASE_URL + "/courses/deleteCourse",

    CREATE_SECTION_API: BASE_URL + "/courses/add-section",
    DELETE_SECTION_API: BASE_URL + "/courses/delete-section",
    UPDATE_SECTION_API: BASE_URL + "/courses/update-section",

    CREATE_SUBSECTION_API: BASE_URL + "/courses/add-subsection",
    DELETE_SUBSECTION_API: BASE_URL + "/courses/delete-subsection",
    UPDATE_SUBSECTION_API: BASE_URL + "/courses/update-subsection",
}

// payment Endpoints
export const paymentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payment/capture-payment",
    PAYMENT_VERIFY_SIGNATURE_API: BASE_URL + "/payment/verify-signature",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}

// profile endpoints
export const profileEndpoints = {
    // get user full details
    USER_ENROLLED_COURSES: BASE_URL + "/profile/enrolled-courses",
    GET_USER_DETAILS_API: BASE_URL + "/profile/get-data",
    GET_INSTRUCTOR_DATA: BASE_URL + "/profile/get-instructor-data"
}