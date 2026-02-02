import { endpoints } from "../APIs";
import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector.js";

const {CONTACT_US_API} =endpoints;

export async function contactUsAPI(data) {
    const toastId = toast.loading("Sending your message...");
    try {
        const response = await apiConnector("POST", CONTACT_US_API,data);
        console.log("Response from contact API:", response);
        
        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Message sent successfully!");
        return response;
    } catch (error) {
        console.error("Error sending contact form:", error);
        toast.error("Failed to send message. Please try again later.");
    } finally {
        toast.dismiss(toastId);
    }
}