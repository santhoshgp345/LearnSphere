import { FaFacebook, FaYoutube } from "react-icons/fa";
import { AiFillGoogleCircle } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { TbHexagonLetterSFilled } from "react-icons/tb";
import { resources,subjects,plans,community,company,careerBuilding,languages } from "../../data/footerData"; 

const Footer = () => {
    return(
        <div className="w-[100vw] h-auto flex flex-col bg-[#161D29] text-[#838894] text-sm p-4 mt-8 mx-auto">
            <div className="w-[85%] mx-auto p-2 flex flex-wrap justify-around">
                <div className="flex flex-row flex-wrap justify-between items-start p-4 gap-10">
                    <div className="flex flex-col p-2 gap-5">
                        <div className="flex flex-col gap-2">
                        <div className="font-semibold text-[#AFB2BF]">
                                Company
                            </div>
                            <div className="flex flex-col gap-1">
                                {company.map((value,index) => {
                                    return (
                                        <div key={index}>
                                            {value}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <FaFacebook/>
                            <AiFillGoogleCircle/>
                            <FaXTwitter/>
                            <FaYoutube/>
                        </div>
                        <div className="flex flex-row gap-1 text-3xl font-semibold text-white items-center mt-8">
                            <TbHexagonLetterSFilled/> <p className="text-xl">SkillNova</p>
                        </div>
                    </div>
                    <div className="flex flex-col p-2 gap-5">
                        <div className="flex flex-col gap-2">
                            <div className="font-semibold text-[#AFB2BF]">
                                Resources
                            </div>
                            <div className="flex flex-col gap-1">
                                {resources.map((value,index) => {
                                    return (
                                        <div key={index}>
                                            {value}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="font-semibold text-[#AFB2BF]">
                                Support
                            </div>
                            <div>
                                Help Center
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col p-2 gap-5">
                        <div className="flex flex-col gap-2">
                            <div className="font-semibold text-[#AFB2BF]">
                                Plans
                            </div>
                            <div className="flex flex-col gap-1">
                                {plans.map((value,index) => {
                                    return (
                                        <div key={index}>
                                            {value}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="font-semibold text-[#AFB2BF]">
                                Community
                            </div>
                            <div className="flex flex-col gap-1">
                            {community.map((value,index) => {
                                    return (
                                        <div key={index}>
                                            {value}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row flex-wrap justify-between items-start p-4 gap-10">

                    <div className="flex flex-col p-2">
                        <div className="flex flex-col gap-2">
                            <div className="font-semibold text-[#AFB2BF]">
                                Subjects
                            </div>
                            <div className="flex flex-col gap-1">
                                {subjects.map((value,index) => {
                                    return (
                                        <div key={index}>
                                            {value}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col p-2">
                        <div className="flex flex-col gap-2">
                        <div className="font-semibold text-[#AFB2BF]">
                            Languages
                        </div>
                        <div className="flex flex-col gap-1">
                            {languages.map((value,index) => {
                                return (
                                    <div key={index}>
                                        {value}
                                    </div>
                                )
                            })}
                        </div>

                        </div>
                    </div>

                    <div className="flex flex-col p-2">
                        <div className="flex flex-col gap-2">
                        <div className="font-semibold text-[#AFB2BF]">
                            Career Building
                        </div>
                        <div className="flex flex-col gap-1">
                            {careerBuilding.map((value,index) => {
                                return (
                                    <div key={index}>
                                        {value}
                                    </div>
                                )
                            })}
                        </div>

                        </div>
                    </div>

                </div>
            </div>

            <hr className="w-[85%] border-1 border-[#2C333F] mx-auto p-2"/>

            <div className="w-[85%] mx-auto flex flex-row flex-wrap items-center justify-between text-sm mt-2 mb-4">
                <div className="flex flex-row items-center gap-1">
                    <span className="border-r-2 border-[#2C333F] px-3">Privacy Policy</span>
                    <span className="border-r-2 border-[#2C333F] px-3">Cookies Policy</span>
                    <span className="px-3">Terms</span>
                </div>
                <div>
                Made with ♥ Target Technology © 2025 SkillNova
                </div>
            </div>
        </div>
    )
}

export default Footer;