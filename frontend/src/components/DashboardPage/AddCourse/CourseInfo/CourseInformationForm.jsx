import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import { addCourseDetails,editCourseDetails,fetchCategories } from "../../../../services/operations/courseDetailAPI"
import { setCourse,setStep } from "../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../utils/constants"
import IconBtn from "../../../Common/IconBtn"
import Upload from "../Upload"
import ChipInput from "./ChipInput"

export default function CourseInformationForm() {
  const {step}  = useSelector((state) => state.course)
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { user} = useSelector((state) => state.profile)
  const { course, editCourse } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchCategories()
      // console.log(categories)
      if (categories.length > 0) {
        // console.log("categories", categories)
        setCourseCategories(categories)
      }
      setLoading(false)
    }
    // if form is in edit mode
    if (editCourse) {
      // console.log("data populated", editCourse)
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("thumbnail", course.thumbnail)
    }
    getCategories()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.thumbnail !== course.thumbnail
    ) {
      return true
    }
    return false
  }

  //   handle next button click
  const onSubmit = async (data) => {
     // console.log("Data during Edit course : ",data)

    if (editCourse) {
      // const currentValues = getValues()
      // console.log("changes after editing form values:", currentValues)
      // console.log("now course:", course)
      // console.log("Has Form Changed:", isFormUpdated())
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        // console.log(data)
        formData.append("courseId", course._id)
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc)
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags))
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory)
        }
        
        if (currentValues.thumbnail !== course.thumbnail) {
          formData.append("thumbnailImage", data.thumbnail?.[0] || data.thumbnail)
        }
        formData.append("email", user.email);
        // console.log("Edit Form data: ", formData)
        setLoading(true)
        // console.log("object10")
        // console.log(formData.get(""))
        // console.log("object5")
        
        // console.log("Print Data before Edit...")
        /* for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
        }*/
        const result = await editCourseDetails(token,formData)
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("thumbnailImage", data.thumbnail)
    formData.append("email", user.email);
    setLoading(true)
    // console.log("object1")
    // console.log(data.courseTitle)
    // console.log(formData.get("email"));
    // console.log("object5")
    const result = await addCourseDetails(token,formData)
    // console.log("Result from addCourse : ",result)
    if (result) {
      dispatch(setStep(2))
      // console.log(" Step at CourseInfo :",step)
      dispatch(setCourse(result))
    }
    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] text-white border-richblack-700 bg-richblack-800 p-6"
    >
      {/* Course Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm" htmlFor="courseTitle">
          Course Title <sup className="text-red-600">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="form-style w-full bg-slate-900 rounded-md text-white border border-1 border-gray-300 p-2"
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-red-600">
            Course title is required
          </span>
        )}
      </div>
      {/* Course Short Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm" htmlFor="courseShortDesc">
          Course Short Description <sup className="text-red-600">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full bg-slate-900 rounded-md text-white border border-1 border-gray-300 p-2"
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-red-600">
            Course Description is required
          </span>
        )}
      </div>
      {/* Course Price */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm" htmlFor="coursePrice">
          Course Price <sup className="text-red-600">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full !pl-12 bg-slate-900 rounded-md text-white border border-1 border-gray-300 p-2"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-white" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-red-600">
            Course Price is required
          </span>
        )}
      </div>
      {/* Course Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm" htmlFor="courseCategory">
          Course Category <sup className="text-red-600">*</sup>
        </label>
        <select
          {...register("courseCategory", { required: true })}
          defaultValue=""
          id="courseCategory"
          className="form-style w-full bg-slate-900 rounded-md text-white border border-1 border-gray-300 p-2"
        >
          <option value="" disabled style={{ color: "white", backgroundColor: "black" }}>
            Choose a Category
          </option>

          {!loading &&
            courseCategories?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-red-600">
            Course Category is required
          </span>
        )}
      </div>
      {/* Course Tags */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      {/* Course Thumbnail Image */}
      <Upload
        name="thumbnail"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />
      {/* Benefits of the course */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm " htmlFor="courseBenefits">
          Benefits of the course <sup className="">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full bg-slate-900 rounded-md text-white border border-1 border-gray-300 p-2"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-red-600">
            Benefits of the course is required
          </span>
        )}
      </div>
      
      {/* Next Button */}
      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue Without Saving
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  )
}