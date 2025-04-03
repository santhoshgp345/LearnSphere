import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { logout,deleteProfile } from "../../services/operations/authAPI";

const LogoutModal = ({modalData,setLogoutModalData}) => {
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleButton = (e) => {
        e.preventDefault();
        if(modalData?.btnText === "Delete"){
            dispatch(deleteProfile(modalData?.user,token,navigate));
            return;
        }

        dispatch(logout(navigate));
    }

    return(
        <div 
        onClick={() => setLogoutModalData(null)}
        className="fixed top-0 left-0 w-[100vw] h-[100vh] flex flex-col items-center justify-center mx-0 z-10 bg-black bg-opacity-60">
            <div
             className="w-[22rem] p-4 flex flex-col gap-3 bg-[#000814] border-2 border-[#2C333F] rounded-lg">
                <p className="text-3xl text-[white] font-semibold">
                    {modalData.text1}
                </p>
                <p className="text-[#838894]">
                    {modalData.text2}
                </p>
                <div className="flex flex-row justify-between items-center mt-6">
                    <button className="flex flex-row items-center text-md text-lg px-6 py-3 rounded-md font-semibold hover:scale-95 transition-all duration-200
                    bg-[#161D29] text-white"
                    onClick={() => setLogoutModalData(null)}
                    >
                        Cancel
                    </button>
                    <button
                    onClick={handleButton}
                    className="flex flex-row items-center text-md text-lg px-6 py-3 rounded-md font-semibold hover:scale-95 transition-all duration-200 bg-yellow-400 text-black">
                        {modalData.btnText}
                    </button>
                </div>
            </div>
        </div>
    )
}
export default LogoutModal;