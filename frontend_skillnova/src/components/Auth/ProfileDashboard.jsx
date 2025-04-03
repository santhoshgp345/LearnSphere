import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/operations/authAPI";

const ProfileDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logout(navigate))
    }
    return(
        <div>
            <button 
            onClick={handleLogout}
            className="border-2 border-red-600 text-red-600 p-2 rounded-lg"
            >Logout</button>
        </div>
    )
}

export default ProfileDashboard;