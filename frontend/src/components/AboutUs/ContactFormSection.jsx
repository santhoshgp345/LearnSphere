import ContactUsForm from "../ContactForm/ContactUsForm";

const ContactFormSection = () => {

    return(
        <div className="w-[90vw] lg:w-[35vw] mx-auto p-6 my-4 flex flex-col gap-4 items-center border-2 border-[#2C333F] rounded-lg justify-between">
            <h1 className="text-3xl text-[#F1F2FF] font-semibold">
                Get in Touch
            </h1>
            <p className="text-[#838894] text-sm">
            We’d love to here for you, Please fill out this form.
            </p>
            <div className="w-full">
                <ContactUsForm/>
            </div>

        </div>
    )
}

export default ContactFormSection;