import { NavbarLinks } from "../../data/navbar-links";
import { Link, matchPath } from "react-router-dom";
import {  TbHexagonLetterLFilled } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { fetchCategories } from "../../services/operations/courseDetailAPI.js";

const NavBar = () => {
    const {token} = useSelector((state) => state.auth)
    const {cartItems} = useSelector((state) => state.cart);
    const user = useSelector((state) => state.profile.user);
    //console.log("User image : ",user?.image);

    const location = useLocation();

    const [subLinks, setSubLinks] = useState([]);

    const getCategories = async () => {
        // console.log("new Yes")
        const data = await fetchCategories();
        setSubLinks(data);
    }

    useEffect(() => {
        // console.log("useEffect Running");
        getCategories();
    },[])

    const matchRoute = (route) => {
        return matchPath({path:route},location.pathname);
    }

    return(
        <div className="w-[100vw] flex items-center bg-[#161D29] border-b-2 border-[#2C333F] text-white">
            <div className="w-[85%] mx-auto flex flex-wrap gap-6 max-w-maxContent items-center justify-between p-2">
            
            {/* Logo navigation */}
            <Link to="/">
               <div className="flex flex-row gap-2 items-center text-3xl font-semibold">
                <TbHexagonLetterLFilled size={40} color="blue" /> 
                 <p className="text-2xl">LearnSphere</p>
               </div>
            </Link>

            {/* Nav Links */}
            <nav>
                <ul className="relative flex flex-row gap-5 text-[#DBDDEA]">
                    {
                        NavbarLinks.map((link, index) => {
                            return (
                                <li key={index}>
                                    {
                                        link.title === "Catalog" ? (
                                            <div className={`group flex flex-row gap-1 cursor-pointer items-center font-semibold `}>
                                                <p>{link.title}</p> <FaAngleDown/>
                                                {
                                                    subLinks.length ? (
                                                        <div className="invisible group-hover:visible absolute top-[150%] left-[15%] flex flex-col items-center rounded-lg pt-4 bg-white z-10 transition-all duration-100">
                                                    {
                                                        subLinks.map((value,id) => {
                                                            return (
                                                                <Link key={id} to={`/catalog/${value.name.replace(" ","-").toLowerCase()}`}>
                                                                    <div className="py-2 px-4 text-black text-center font-bold cursor-pointer">
                                                                        {value.name}
                                                                    </div>
                                                                </Link>
                                                            )
                                                        })
                                                    }
                                                    <div className="absolute -top-2 bg-white p-2 rotate-45">
                                                    </div>
                                                   </div>
                                                ) : (
                                                    <div className="invisible group-hover:visible absolute top-[150%] left-[15%] rounded-lg p-4 bg-white text-black z-10 transition-all duration-100">
                                                        No Category Found
                                                    </div>
                                                    )
                                                }
                                            </div>
                                        ) : (
                                            <Link to={link?.path}>
                                                <p className={`${matchRoute(link?.path) ? "text-yellow-400":""} font-semibold`}>
                                                    {link?.title}
                                                </p>
                                            </Link>
                                        )
                                    }
                                </li>
                            )
                        })
                    }
                    {
                        token !== null && (
                            <Link to={"/courses"}>
                                <p className={`${matchRoute("/courses") ? "text-yellow-400":""} font-semibold`}>
                                    Courses
                                </p>
                            </Link>
                        )
                    }
                </ul>
            </nav>

            {/* Login/Signup/Dashboard */}
            <div className="flex flex-row gap-5 items-center text-[#cfd7fc] font-semibold">
            {
                user && user.accountType !== "Instructor" && (
                    <Link to="/dashboard/cart" className="relative">
                        <IoCartOutline className="text-2xl" />

                        {cartItems > 0 && (
                            <span 
                                className="absolute -top-2 -right-2 flex items-center justify-center 
                                            bg-yellow-400 text-black text-xs font-bold w-5 h-5 
                                            rounded-full"
                            >
                                {cartItems}
                            </span>
                        )}
                    </Link>
                )
            }

                {
                    token === null && (
                        <Link to="/login">
                            <button className="px-3 py-2 rounded-2xl bg-[#000814] border-2 border-[#FFFFFF2E]">Login</button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to="/signup">
                            <button className="px-3 py-2 rounded-2xl bg-[#000814] border-2 border-[#FFFFFF2E]">Signup</button>
                        </Link>
                    )
                }
                {
                    token !== null && (
                        <Link to="/dashboard/my-profile">
                            <div className="flex justify-center items-center rounded-full border-2">
                                <img
                                className="w-[2rem] h-[2rem] rounded-full"
                                src={user?.image} 
                                alt="profile.img" 
                                />
                            </div>
                        </Link>
                    )
                }
            </div>

            </div>
        </div>
    )
}

export default NavBar;