
import { FaCartArrowDown } from "react-icons/fa";

export const sidebarLinks = [
    {
        id: 1,
        name: "My Profile",
        path: "/dashboard/my-profile",
        icon: "VscAccount"
    },
    {
        id: 2,
        name: "Instructors",
        path: '/dashboard/instructor',
        type: "Instructor",
        icon: 'VscProject',
    },
    {
        id: 3,
        name: "My Courses",
        path: "/dashboard/instructor-courses",
        type: "Instructor",
        icon: "VscVm"
    },
    {
        id: 4,
        name: "Add Course",
        path: "/dashboard/add-courses",
        type: "Instructor",
        icon: "VscAdd"
    },
    {
        id: 5,
        name: "Enrolled Courses",
        path: "/dashboard/enrolled-courses",
        type: "Student",
        icon:"VscMortarBoard"
    },
    {
        id: 7,
        name: "Cart",
        path: "/dashboard/cart",
        type: "Student",
        icon: FaCartArrowDown
    }
]