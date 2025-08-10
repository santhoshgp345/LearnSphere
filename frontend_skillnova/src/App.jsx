import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import UpdatePassword from "./pages/UpdatePassword.jsx";
import VerifyEmailOTP from "./pages/VerifyEmailOTP.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import MyProfile from "./components/DashboardPage/MyProfile.jsx";
import OpenRoute from "./components/Auth/OpenRoute.jsx";
import PrivateRoute from "./components/Auth/PrivateRoute.jsx";
import Settings from "./components/DashboardPage/Settings/Settings.jsx";
import EnrolledCourses from "./components/DashboardPage/EnrolledCourses.jsx";
import Cart from "./components/DashboardPage/Cart/Cart.jsx";
import AddCourses from "./components/DashboardPage/AddCourse/AddCourses.jsx";
import InstructorCourses from "./components/DashboardPage/InstructorCourses.jsx";
import Instructor from "./components/DashboardPage/InstructorDashBoard/Instructor.jsx";
import Courses from "./components/Courses/Courses.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import EditCourse from "./components/DashboardPage/EditCourse/EditCourse.jsx";
import ViewCourse from "./pages/ViewCourse.jsx";
// import VideoDetails from "./components/ViewCourse/VideoDetails.jsx";

function App() {
  console.log("Print backend url : ",import.meta.env.VITE_BASE_URL)
  return (
    <div className="w-screen min-h-screen bg-[#000814] flex flex-col">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/about"
          element={
              <About />
          }
        />
         <Route
          path="/contact"
          element={
              <Contact />
          }
        />
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path="/courses" element={
          <PrivateRoute>
            <Courses/>
          </PrivateRoute>
        }
        />

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Settings/>} />
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>} />
          <Route path="dashboard/cart" element={<Cart/>}/>
          <Route path="dashboard/add-courses" element={<AddCourses/>}/>
          <Route path="dashboard/instructor" element={<Instructor/>}/>
          <Route path="dashboard/instructor-courses" element={<InstructorCourses/>}/>
          <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
        </Route>

        <Route
          path="/signup/verify-email"
          element={
            <OpenRoute>
              <VerifyEmailOTP />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="/update-password/:token"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route path="/view-course/:courseId" element={<ViewCourse />}>
          {/* {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <> }
                <Route path="section/:sectionId/sub-section/:subSectionId" element={<VideoDetails />}/>
              { </>
            )
          } */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
