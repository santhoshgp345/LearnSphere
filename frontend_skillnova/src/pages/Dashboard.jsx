import { useSelector } from "react-redux"
import SideBar from "../components/DashboardPage/SideBar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {

    let {loading: authLoading} = useSelector((state) => state.auth);
    const {loading: profileLoading} = useSelector((state) => state.profile);

    if(authLoading || profileLoading){
        return(
            <div className="w-[100vw] flex h-[90vh] items-center justify-center">
                <div className="spinner"></div>
            </div>
        )
    }

    return(
        <div className="relative w-[100vw] min-h-[calc(100vh-54px)] flex flex-row">
            <SideBar/>
            <div className="p-8 w-[85vw] overflow-auto">
                <div className="w-[80%] mx-auto flex flex-col items-center justify-between">
                <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;