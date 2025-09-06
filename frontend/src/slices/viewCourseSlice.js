import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    courseSectionData: [],
    courseEntireData: [],
    completedLectures: [],
    totalNoOfLeactures: 0
}

const viewCourse = createSlice({
    name: "viewCourse",
    initialState,
    reducers:{
        setCourseSectionData: (state,action) => {
            state.courseSectionData = action.payload;
        },
        setEntireCourseData: (state,action) => {
            state.courseEntireData = action.payload;
        },
        setTotalNoOfLectures: (state,action) => {
            state.totalNoOfLeactures = action.payload;
        },
        setCompletedLectures: (state,action) => {
            state.completedLectures = action.payload;
        },
        updateCompletedLectures: (state,action) => {
            state.completedLectures = [...state.completedLectures, action.payload];
        }
    }
})

export const {
    setCompletedLectures,
    setCourseSectionData,
    setTotalNoOfLectures,
    setEntireCourseData,
    updateCompletedLectures
} = viewCourse.actions;
export default viewCourse.reducer;