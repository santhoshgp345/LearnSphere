import { RiDeleteBin6Line } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import LogoutModal from "../../LogoutModal/LogoutModal"
import { useState } from "react"

export default function DeleteAccount() {
  // const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [deleteModal,setDeleteModal] = useState(null);

  return (
    <>
      <div className="w-[80%] flex flex-row items-center gap-5 bg-[#340019] border-2 border-[#691432] py-6 px-8 rounded-lg">
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
    </>
  )
}