import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import LogoutModal from "../LogoutModal/LogoutModal";

const MyProfile = () => {

    const user = useSelector((state) => state.profile.user);
    const navigate = useNavigate();

    const [deleteModal,setDeleteModal] = useState(null);

    // console.log("User Contact : ",user?.additionalDetails)

    return(
        <div className="w-[100%] flex flex-col gap-5">
            <h1 className="text-2xl text-white font-semibold">
                My Profile
            </h1>

            {/* section 1 */}
            <div className="flex flex-row items-center justify-between bg-[#161D29] border-2 border-[#2C333F] py-6 px-8 rounded-lg">
                <div className="flex flex-row gap-7 items-center">
                    <img src={`${user?.image}`} alt={`profile-${user?.firstName}`} 
                    className="aspect-square w-[78px] rounded-full object-cover"/>
                    <div className="flex flex-col gap-1">
                        <p className="text-white text-lg font-semibold">
                            {user?.firstName + " " + user?.lastName}
                        </p>
                        <p className="text-[#838894]">
                            {user?.email}
                        </p>
                    </div>
                </div>
                <div>
                <button
                className="rounded-lg px-4 py-2 flex flex-row items-center gap-2 bg-yellow-400 text-black font-semibold"
                onClick={() => navigate("/dashboard/settings")}
                >
                    <FaEdit/><p>Edit</p>
                </button>
                </div>
            </div>

            {/* section 2 */}
            <div className="flex flex-col items-center gap-5 justify-between bg-[#161D29] border-2 border-[#2C333F] py-6 px-8 rounded-lg">
                <div className="w-[100%] flex flex-row justify-between items-center">
                    <h2 className="text-xl text-white font-semibold">
                        Personal Details
                    </h2>
                    <div>
                        <button
                        className="rounded-lg px-4 py-2 flex flex-row items-center gap-2 bg-yellow-400 text-black font-semibold"
                        onClick={() => navigate("/dashboard/settings")}
                        >
                            <FaEdit/><p>Edit</p>
                        </button>
                    </div>
                </div>
                <div className="w-[100%] flex flex-row items-center">
                    <div className="w-[50%] flex flex-col gap-2">
                        <p className="text-sm text-[#424854]">
                            FIRST NAME
                        </p>
                        <p className="font-semibold text-white">
                            {user?.firstName}
                        </p>
                    </div>
                    <div className="w-[50%] flex flex-col gap-2">
                    <p className="text-sm text-[#424854]">
                            LAST NAME
                        </p>
                        <p className="font-semibold text-white">
                            {user?.lastName}
                        </p>
                    </div>
                </div>
                <div className="w-[100%] flex flex-row items-center">
                    <div className="w-[50%] flex flex-col gap-2">
                        <p className="text-sm text-[#424854]">
                            EMAIL
                        </p>
                        <p className="font-semibold text-white">
                            {user?.email}
                        </p>
                    </div>
                    <div className="w-[50%] flex flex-col gap-2">
                    <p className="text-sm text-[#424854]">
                            PHONE NUMBER
                        </p>
                        <p className="font-semibold text-white">
                            {`(${user?.additionalDetails?.countryCode}) ${user?.additionalDetails?.contactNo}`}
                        </p>
                    </div>
                </div>
                <div className="w-[100%] flex flex-row items-center">
                    <div className="w-[50%] flex flex-col gap-2">
                        <p className="text-sm text-[#424854]">
                            GENDER
                        </p>
                        <p className="font-semibold text-white">
                            {user?.additionalDetails?.gender || "-"}
                        </p>
                    </div>
                    <div className="w-[50%] flex flex-col gap-2">
                    <p className="text-sm text-[#424854]">
                            Date Of Birth
                        </p>
                        <p className="font-semibold text-white">
                            {`${user?.additionalDetails?.dateOfBirth || "-"}`}
                        </p>
                    </div>
                </div>
            </div>

            {/* section 3 */}
            <div className="flex flex-row items-center gap-5 bg-[#340019] border-2 border-[#691432] py-6 px-8 rounded-lg">
            <button
            onClick={() => setDeleteModal({
                text1: "Are You Sure ?",
                text2: "Your Account will be deleted from the Website",
                btnText: "Delete",
                user: user
            })}
            className="flex p-2 text-[#EF476F] text-2xl bg-[#691432] rounded-full">
                <RiDeleteBin6Line/>
            </button>
            {
                deleteModal && <LogoutModal modalData={deleteModal} setLogoutModalData={setDeleteModal}/>
            }
            <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-semibold text-white">
                    Delete Account
                </h2>
                <p className="text-white font-semibold">
                Would you like to delete account?
                </p>
                <p className="text-white">

                </p>
                <div className="text-[#D43D63] italic font-semibold">
                I want to delete my Account
                </div>
            </div>

            </div>
            
        </div>
    )
}

export default MyProfile;