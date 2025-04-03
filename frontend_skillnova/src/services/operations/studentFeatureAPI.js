import { toast } from "react-hot-toast";
import { paymentEndpoints } from "../APIs";
import { apiConnector } from "../apiconnector.js";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resestCart } from "../../slices/cartSlice"


const {COURSE_PAYMENT_API, PAYMENT_VERIFY_SIGNATURE_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = paymentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}


export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    try{
        //load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        // console.log("Razorpay SDK Loaded:", res);

        if(!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }

        //initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, 
                                {courses, userDetails},
                                {
                                    Authorization: `Bearer ${token}`,
                                }
                            )

        if(!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }
        // console.log("PRINTING orderResponse", orderResponse);
        //options
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY,
            currency: orderResponse.data.currency,
            amount: `${orderResponse.data.amount}`,
            order_id:orderResponse.data.order_id,
            name:"SkillNova",
            description: "Thank You for Purchasing the Course",
            image:rzpLogo,
            prefill: {
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            handler: function(response) {
                //send successful wala mail
                sendPaymentSuccessEmail(response, userDetails, orderResponse.data.amount,token );
                //verifyPayment
                verifyPayment({...response, courses,userDetails}, token, navigate, dispatch);
            }
        }
        //miss hogya tha 
        const paymentObject = new window.Razorpay(options);
        // console.log("Payment Object : ",paymentObject);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })

    }
    catch(error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, userDetails, amount, token) {
    try{
        // console.log("paymentObject res : ",response);
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            userDetails,
            amount,
        },
        // {
        //     Authorization: `Bearer ${token}`
        // }
    )
    }
    catch(error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}

//verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try{
        // console.log("Body data : ",bodyData);
        const response  = await apiConnector("POST", PAYMENT_VERIFY_SIGNATURE_API, bodyData, 
             { Authorization:`Bearer ${token}`,}
        )

        // console.log("payment verify res : ",response);

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("payment Successful, you are addded to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resestCart());
    }   
    catch(error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}