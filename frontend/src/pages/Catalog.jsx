import React, { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector.js";
import { categories } from "../services/APIs.js";
import { getCatalogPageData } from "../services/operations/catalogPageAPI.js";

import Course_Card from "../components/Catalog/Course_Card";
import CourseSlider from "../components/Catalog/CourseSlider";

import { useSelector } from "react-redux";
import Error from "./Error";

const Catalog = () => {

  const { loading } = useSelector((state) => state.profile);
  const { catalogName } = useParams();

  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [active, setActive] = useState(1);

  // ---------------------------
  // FETCH CATEGORY ID
  // ---------------------------
  useEffect(() => {

    const getCategories = async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);

        // const category = res?.data?.data?.find(
        //   (ct) =>
        //     ct.name.split(" ").join("-").toLowerCase() === catalogName
        // );
        const category = res?.data?.Categories?.find(
  (ct) =>
    ct.name.split(" ").join("-").toLowerCase() === catalogName
);

console.log("Categories API Response:", res?.data?.Categories);

        console.log("Catalog Name from URL:", catalogName);
   console.log("Categories API Response:", res?.data?.data);
    console.log("Matched Category:", category);
    console.log("CATEGORY ID =>", category?._id);

        if (category) {
          setCategoryId(category._id);
        }

      } catch (error) {
        console.log("Category Fetch Error:", error);
      }
    };

    getCategories();

  }, [catalogName]);

  // ---------------------------
  // FETCH CATEGORY COURSES
  // ---------------------------
  useEffect(() => {

    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogPageData(categoryId);
        console.log("CATALOG DATA =>", res);
        setCatalogPageData(res);
      } catch (error) {
        console.log("Catalog API Error:", error);
      }
    };

    if (categoryId) {
      getCategoryDetails();
    }

  }, [categoryId]);

  // ---------------------------
  // LOADING STATE
  // ---------------------------
  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  // ---------------------------
  // ERROR STATE
  // ---------------------------
  if (!loading && !catalogPageData.success) {
    return <Error />;
  }

  // ---------------------------
  // UI
  // ---------------------------
  return (
    <>
      {/* HERO SECTION */}
      <div className="bg-richblack-800 px-4">
        <div className="px-10 mx-auto flex min-h-[260px] flex-col justify-center gap-4">

          <p className="text-sm text-richblack-300">
            Home / Catalog /
            <span className="text-yellow-400 ml-1">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>

          <h1 className="text-3xl text-white font-bold">
            {catalogPageData?.data?.selectedCategory?.name}
          </h1>

          <p className="max-w-[800px] text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>

        </div>
      </div>

      {/* SECTION 1 */}
      <div className="px-10 py-10">

        <h2 className="text-white text-2xl mb-4">
          Courses to get you started
        </h2>

        <CourseSlider
          Courses={catalogPageData?.data?.selectedCategory?.courses}
        />

      </div>

      {/* SECTION 2 */}
      <div className="px-10 py-10">

        <h2 className="text-white text-2xl mb-4">
          Top Courses
        </h2>

        <CourseSlider
          Courses={catalogPageData?.data?.differentCategory?.courses}
        />

      </div>

      {/* SECTION 3 */}
      <div className="px-10 py-10">

        <h2 className="text-white text-2xl mb-4">
          Frequently Bought
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {catalogPageData?.data?.mostSellingCourses
            ?.slice(0, 4)
            .map((course, index) => (
              <Course_Card
                key={index}
                course={course}
                Height="h-[250px]"
              />
            ))}

        </div>

      </div>

      <Footer />
    </>
  );
};

export default Catalog;

// import React, { useEffect, useState } from 'react'
// import Footer from "../components/Footer/Footer";
// import { useParams } from 'react-router-dom'
// import { apiConnector } from '../services/apiconnector.js'
// import { categories } from '../services/APIs.js'
// // import { getCatalogPageData } from '../services/operations/pageAndComponentData.js';
// import { getCatalogPageData } from "../services/operations/catalogPageAPI.js";

// // import Course_Card from '../components/core/Catalog/Course_Card';
// import Course_Card from "../components/Catalog/Course_Card";

// // import CourseSlider from '../components/core/Catalog/CourseSlider';
// import CourseSlider from "../components/Catalog/CourseSlider";

// import { useSelector } from "react-redux"
// import Error from "./Error"

// const Catalog = () => {

//     const { loading } = useSelector((state) => state.profile)
//   const { catalogName } = useParams()
//   const [active, setActive] = useState(1)
//     const [catalogPageData, setCatalogPageData] = useState(null);
//     const [categoryId, setCategoryId] = useState("");

//     //Fetch all categories
//     useEffect(()=> {
//         const getCategories = async() => {
//           // console.log("Heloo Yes")
//             const res = await apiConnector("GET", categories.CATEGORIES_API);
//             const category_id = res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
//             // console.log(category_id)
//             setCategoryId(category_id);
//         }
//         getCategories();
//     },[catalogName]);

//     // useEffect(() => {
//     //     const getCategoryDetails = async() => {
//     //         try{
//     //             // const res = await getCatalogPageData(categoryId);
//     //             // const res = await getCatalogPageData();
//     //              const res = await getCatalogPageData(categoryId);

//     //             // console.log("PRinting res: ", res);
//     //             setCatalogPageData(res);
//     //         }
//     //         catch(error) {
//     //             console.log(error)
//     //         }
//     //     }
//     //     if(categoryId) {
//     //         getCategoryDetails();
//     //     }
//     //     // getCategoryDetails();

//     // },[categoryId]);
//     useEffect(() => {
//   const getCategoryDetails = async () => {
//     try {
//       const res = await getCatalogPageData(categoryId);
//       setCatalogPageData(res);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (categoryId) {
//     getCategoryDetails();
//   }

// }, [categoryId]);



//     if (loading || !catalogPageData) {
//         return (
//           <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//             <div className="spinner"></div>
//           </div>
//         )
//       }
//       if (!loading && !catalogPageData.success) {
//         return <Error />
//       }
    
//       return (
//         <>
//           {/* Hero Section */}
//           <div className=" box-content bg-richblack-800 px-4">
//             <div className="px-10 mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
//               <p className="text-sm text-richblack-300">
//                 {`Home / Catalog / `}
//                 <span className="text-yellow-400">
//                   {catalogPageData?.data?.selectedCategory?.name}
//                 </span>
//               </p>
//               <p className="text-3xl text-richblack-300 font-medium">
//                 {catalogPageData?.data?.selectedCategory?.name}
//               </p>
//               <p className="max-w-[870px] text-richblack-200">
//                 {catalogPageData?.data?.selectedCategory?.description}
//               </p>
//             </div>
//           </div>
    
//           {/* Section 1 */}
//           <div className=" mx-auto box-content w-[90%] max-w-maxContentTab px-10 py-12 lg:max-w-maxContent">
//             <div className="section_heading text-4xl font-medium text-white px-10">Courses to get you started</div>
//             <div className="my-4 flex border-b border-b-richblack-600 text-sm px-10">
//               <p
//                 className={`text-white py-2 ${
//                   active === 1
//                     ? "border-b-4 border-b-yellow-600 text-yellow-400"
//                     : "text-richblack-300"
//                 } cursor-pointer w-[150px] flex justify-center items-center`}
//                 onClick={() => setActive(1)}
//               >
//                 Most Popular
//               </p>
//               <p
//                 className={`px-4 py-2 w-[150px] flex justify-center items-center text-white ${
//                   active === 2
//                     ? " border-b-yellow-600 text-yellow-400 border-b-4"
//                     : "text-richblack-300"
//                 } cursor-pointer`}
//                 onClick={() => setActive(2)}
//               >
//                 New
//               </p>
//             </div>
//             <div className='pt-10'>
//               {/* <CourseSlider
//                 Courses={catalogPageData?.data?.selectedCategory?.courses}
//               /> */
//               <CourseSlider
//   Courses={catalogPageData}
// />

//               }
//             </div>
//           </div>
//           {/* Section 2 */}
//           <div className=" mx-auto box-content w-[90%] max-w-maxContentTab px-10 py-12 lg:max-w-maxContent">
//             <div className="section_heading text-white text-4xl font-medium">
//               Top courses in {catalogPageData?.data?.differentCategory?.name}
//             </div>
//             <div className="my-4 flex border-b border-b-richblack-600 text-sm py-5"></div>
//             <div className="py-8">
//               {/* <CourseSlider
//                 Courses={catalogPageData?.data?.differentCategory?.courses}
//               /> */
//               <CourseSlider
//   Courses={catalogPageData}
// />

//               }
//             </div>
//           </div>
    
//           {/* Section 3 */}
//           <div className=" box-content w-[90%] max-w-maxContentTab py-12 lg:max-w-maxContent mx-10">
//             <div className="section_heading text-white text-4xl font-medium">Frequently Bought</div>
//             <div className="my-4 flex border-b border-b-richblack-600 text-sm py-5"></div>
//             <div className="py-8">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mx-auto">
//                 {/* {catalogPageData?.data?.mostSellingCourses
//                   ?.slice(0, 4)
//                   .map((course, i) => ( */
//                   catalogPageData
//         ?.slice(0, 4)
//         .map((course, i) => ( 
//                     <div key={i} >
//                       <Course_Card course={course} Height={"h-[250px]"} />
//                     </div>
//                   ))}
//               </div>

//             </div>
//           </div>
    
//           <Footer />
//         </>
//       )
//     }
    
//     export default Catalog