import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import codeData from "../../data/countryCodes.json"
import { contactUsAPI } from "../../services/operations/contactUsAPI";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    setLoading(true);
    try {
        console.log("CONTACT US DATA : ", data);
        const response = await contactUsAPI(data);

        console.log("Contact us API response:", response);
      if (response?.status !== 200){
        console.error("Unexpected response:", response);
        alert("Something went wrong. Please try again later.");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Unable to send your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        countryCode: "+91",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form
      className="w-full flex flex-col gap-2 justify-between text-sm p-4 mt-4"
      onSubmit={handleSubmit(submitContactForm)}
    >
      {/* First + Last Name */}
      <div className="flex flex-row justify-between items-center">
        <label htmlFor="firstname" className="w-[45%]">
          <p className="text-[#F1F2FF]">
            First Name <sup className="text-red-700">*</sup>
          </p>
          <input
            type="text"
            placeholder="Enter First Name"
            {...register("firstname", { required: true })}
            className="w-full rounded-lg bg-[#161D29] px-4 py-2 text-[#999DAA] border-none my-2"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
          />
          {errors.firstname && (
            <span className="text-red-500">Please enter your name</span>
          )}
        </label>

        <label htmlFor="lastname" className="w-[45%]">
          <p className="text-[#F1F2FF]">Last Name</p>
          <input
            type="text"
            placeholder="Enter Last Name"
            {...register("lastname")}
            className="w-full rounded-lg bg-[#161D29] px-4 py-2 text-[#999DAA] border-none my-2"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
          />
        </label>
      </div>

      {/* Email */}
      <label htmlFor="email" className="w-full">
        <p className="text-[#F1F2FF]">
          Email Address <sup className="text-red-700">*</sup>
        </p>
        <input
          type="text"
          placeholder="Enter Email address"
          {...register("email", { required: true })}
          className="w-full rounded-lg bg-[#161D29] px-4 py-2 text-[#999DAA] border-none my-2"
          style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
        />
        {errors.email && (
          <span className="text-red-500">Please Enter Email</span>
        )}
      </label>

      {/* Phone Number */}
      <label htmlFor="phoneNo" className="w-full">
        <p className="text-[#F1F2FF]">
          Phone Number <sup className="text-red-700">*</sup>
        </p>
        <div className="w-full flex flex-row justify-between items-center">
          <select
            {...register("countryCode", { required: true })}
            className="w-[30%] rounded-xl bg-[#161D29] pl-3 py-2 text-[#999DAA] border-none my-2"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
          >
            {codeData.map((codes, index) => (
              <option key={index} value={codes.code}>
                {codes.country} ({codes.code})
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Enter Phone Number"
            {...register("phoneNo", {
              required: true,
              maxLength: 10,
              minLength: 8,
            })}
            className="w-[65%] rounded-lg bg-[#161D29] px-4 py-2 text-[#999DAA] border-none my-2"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
          />
        </div>
        {errors.phoneNo && (
          <span className="text-red-500">Please Enter Contact Number</span>
        )}
      </label>

      {/* Message */}
      <label htmlFor="message" className="w-full">
        <p className="text-[#F1F2FF]">
          Message <sup className="text-red-700">*</sup>
        </p>
        <textarea
          rows="5"
          placeholder="Enter Feedback"
          {...register("message", { required: true })}
          className="w-full rounded-lg bg-[#161D29] px-4 py-2 text-[#999DAA] border-none my-2"
          style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
        />
        {errors.message && (
          <span className="text-red-500">Please Enter some feedback</span>
        )}
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="mt-3 rounded-lg bg-yellow-400 py-2 px-4 text-lg text-black font-semibold disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactUsForm;
