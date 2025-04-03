import Template from "../components/LoginAndSignup/Template.jsx";
import loginImg from "../assets/Images/loginImg.jpeg"

const Login = () => {
    return(
        <Template
        title={"Welcome Back"}
        desc1={"Build skills for today, tomorrow and beyond."}
        desc2={"Education to future-proof your career."}
        image={loginImg}
        formtype={"login"}
        />
    )
}

export default Login;