import { sidebarLinks } from "../../data/dashboard-links";
import { useDispatch, useSelector } from "react-redux";
import SideBarLinks from "./SideBarLinks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import LogoutModal from "../LogoutModal/LogoutModal";

const SideBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const user = useSelector((state) => state.profile.user);
    const {loading: profileLoading} = useSelector((state) => state.profile);
    const {loading: authLoading} = useSelector((state) => state.auth);

    const [logoutModal,setLogoutModal] = useState(null);

    if(authLoading || profileLoading){
        return(
            <div className="w-[100vw] flex h-[90vh] items-center justify-center">
                <div className="spinner"></div>
            </div>
        )
    }

    return(
        <div className="flex flex-col gap-3 w-[15vw] font-semibold bg-[#161D29]">
            <div className="flex flex-col w-[90%] mx-auto py-4">
                {
                    sidebarLinks.map((link,index) => {
                        if(link.type && user?.accountType !== link.type) return null;
                        return(
                            <SideBarLinks key={index} link={link} iconName={link.icon}/>
                        )
                    })
                }

            </div>
            <div className="mx-auto my-4 h-[1px] w-10/12 bg-[#424854]"></div>
            <div className="flex flex-col w-[90%] mx-auto py-4">
              <SideBarLinks link={{name:"Settings",path:"/dashboard/settings"}} iconName={"VscSettingsGear"}/>
            </div>
            <button 
            onClick={() => setLogoutModal({
                text1: "Are You Sure ?",
                text2: "You will be logout of your Account",
                btnText: "Logout"
            })}
            className="w-[70%] mx-auto text-lg flex flex-row gap-2 items-center justify-center border-2 border-red-600 text-red-600 p-2 rounded-lg"
            ><VscSignOut/><span>Logout</span></button>

            {
                logoutModal && <LogoutModal modalData={logoutModal} setLogoutModalData={setLogoutModal}/>
            }
        </div>
    )
}

export default SideBar;