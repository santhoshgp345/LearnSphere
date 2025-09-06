// import {VscMortarBoard,VscVm ,VscAdd, VscDashboard, VscHistory, VscAccount } from "react-icons/vsc";
import * as Icons from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

const SideBarLinks = ({link,iconName}) => {

    const Icon = Icons[iconName] || iconName;
    const location = useLocation();
    const dispatch = useDispatch();
    // console.log("Icon Name : ",Icon)

    const matchRoute = (route) => {
        return location.pathname === route;
    }

    return(
        <NavLink
        to={link.path}
        >
            <div className={`p-3 flex flex-row gap-2 text-[#838894] font-semibold items-center ${matchRoute(link.path) ? "bg-[#3D2A01] border-l-2 border-[#FFD60A] text-yellow-400" : ""}`}>
                {Icon && <Icon />}<p>{link.name}</p>
            </div>
        </NavLink>
    )
}

export default SideBarLinks;