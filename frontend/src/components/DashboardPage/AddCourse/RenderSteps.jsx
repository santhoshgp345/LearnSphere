import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import CourseInformationForm from "./CourseInfo/CourseInformationForm";
import PublishCourseForm from "./PublishCourse/PublishCourseForm";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setStep } from "../../../slices/courseSlice";

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course);
  // const dispatch = useDispatch();

  const steps = [
    { id: 1, title: "Course Information" },
    { id: 2, title: "Course Builder" },
    { id: 3, title: "Publish" },
  ];

  const [currentStep, setCurrentStep] = useState(step);

  useEffect(() => {
    // console.log(" Step : ",step)
    setCurrentStep(step);

  }, [step]);

  return (
    <>
      <div className="relative mb-2 flex w-full justify-center text-white">
        {steps.map((item) => (
          <React.Fragment key={item.id}>
            <div className="flex flex-col items-center">
              <button
                className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                  currentStep === item.id
                    ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                } ${currentStep > item.id ? "bg-yellow-500 text-yellow-500" : ""}`}
              >
                {currentStep > item.id ? (
                  <FaCheck className="font-bold text-richblack-800" />
                ) : (
                  item.id
                )}
              </button>
            </div>

            {item.id !== steps.length && (
              <div
                className={`h-[calc(34px/2)] w-[33%] border-dashed border-b-2 ${
                  currentStep > item.id ? "border-yellow-500" : "border-richblack-300"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="relative mb-16 flex w-full select-none justify-between">
        {steps.map((item) => (
          <React.Fragment key={item.id}>
            <div className="flex min-w-[130px] flex-col items-center gap-y-2">
              <p className={`text-sm ${currentStep >= item.id ? "text-yellow-300" : "text-white"}`}>
                {item.title}
              </p>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Render the corresponding component */}
      {currentStep === 1 && <CourseInformationForm />}
      {currentStep === 2 && <CourseBuilderForm />}
      {currentStep === 3 && <PublishCourseForm />}
    </>
  );
}
