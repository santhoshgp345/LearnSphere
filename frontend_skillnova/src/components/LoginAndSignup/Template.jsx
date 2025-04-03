import { useSelector } from "react-redux";
import LoginForm from "./LoginForm.jsx";
import SignupForm from "./SignupForm.jsx";
import frameImg from "../../assets/Images/frameImg.webp"

const Template = ({title,desc1,desc2,image,formtype}) => {

    const {loading} = useSelector((state) => state.auth);

    return (
        <div className="w-[100vw] p-8 mx-auto flex items-center relative">
            {
                loading ? (
                    <div className="spinner absolute left-[47%]"></div>
                ) : (
                    <div className="mx-auto flex w-[75%] flex-wrap gap-7 justify-between p-2 my-4">
                        <div className="w-[80%] md:w-[40%]">
                           <h1 className="text-2xl font-semibold text-[#F1F2FF]">
                            {title}
                           </h1>
                           <p className="mt-4 text-lg">
                              <span className="text-[#AFB2BF]">{desc1}</span>{" "}
                              <span className="text-sm italic text-blue-400">{desc2}</span>
                           </p>
                           {formtype === "signup" ? <SignupForm/> : <LoginForm/>}
                        </div>

                        <div className="relative my-4">
                          <img
                          src={frameImg} 
                          alt="cover.img" 
                          width={400}
                          />
                          <img
                          src={image}
                          alt="students"
                          width={400}
                          className="absolute -top-4 right-4 z-10"
                          />
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default Template;