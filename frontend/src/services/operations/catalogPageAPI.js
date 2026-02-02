import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { catalogData } from "../APIs";

export const getCatalogPageData = async (categoryId) => {

  const toastId = toast.loading("Loading...");
  let result = null;

  try {

    const response = await apiConnector(
      "GET",
      `${catalogData.CATALOGPAGEDATA_API}?categoryId=${categoryId}`
    );

    if (!response?.data?.success) {
      throw new Error("Catalog fetch failed");
    }

    result = response.data;

  } catch (error) {

    console.log("CATALOG PAGE DATA API ERROR:", error);
    toast.error("Failed to load catalog");

  }

  toast.dismiss(toastId);
  return result;
};

// import React from 'react'
// import {toast} from "react-hot-toast"
// import { apiConnector } from "../apiconnector.js";
// import { catalogData } from "../APIs";
// export const getCatalogPageData = async () => {
//   const toastId = toast.loading("Loading...");
//   let result = [];

//   try {
//     const response = await apiConnector(
//       "GET",
//       "http://localhost:8001/api/v1/course/showAllCourses"
//     );

//     result = response?.data?.courses || [];

//   } catch (error) {
//     console.log("CATALOG PAGE DATA API ERROR....", error);
//     toast.error("Failed to load catalog");
//   }

//   toast.dismiss(toastId);
//   return result;
// };

// // import React from 'react'
// import {toast} from "react-hot-toast"
// import { apiConnector } from "../apiconnector.js";
// import { catalogData } from "../APIs";

// export const getCatalogPageData = async(categoryId) => {
//   const toastId = toast.loading("Loading...");
//   let result = [];
//   try{
//         const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, 
//         {categoryId: categoryId,});

//         if(!response?.data?.success)
//             throw new Error("Could not Fetch Category page data");

//          result = response?.data;

//   }
//   catch(error) {
//     console.log("CATALOG PAGE DATA API ERROR....", error);
//     toast.error(error.message);
//     result = error.response?.data;
//   }
//   toast.dismiss(toastId);
//   return result;
// }
