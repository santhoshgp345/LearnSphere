const mailSender = require("../utils/mailSender");
const { contactFormEmail } = require("../mail/templates/contactFormEmail");

exports.contactMail = async (req, res) => {
  try {
    const { firstname, lastname, email, countryCode, phoneNo, message } =
      req.body;

    if (!firstname || !email || !phoneNo || !message) {
      return res
        .status(400)
        .json({
          success: false,
          message: "All required fields must be filled",
        });
    }

    // Send mail to board/admin
    await mailSender(
      process.env.MAIL_USER,
      "📩 New Contact Form Submission",
      contactFormEmail(
        firstname,
        lastname || "",
        email,
        `${countryCode} ${phoneNo}`,
        message
      )
    );

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again later",
    });
  }
};
