exports.contactFormEmail = (firstname, lastname, email, phone, message) => {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>New Contact Form Submission</title>
    <style>
        body {
            background-color: #ffffff;
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.4;
            color: #333333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f9f9f9;
        }
        .heading {
            font-size: 20px;
            font-weight: bold;
            color: #000;
            margin-bottom: 15px;
        }
        .details {
            text-align: left;
            font-size: 16px;
            margin-bottom: 20px;
        }
        .details p {
            margin: 5px 0;
        }
        .highlight {
            font-weight: bold;
            color: #000;
        }
        .message-box {
            padding: 10px;
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 15px;
        }
        .brand-link {
            font-size: 18px;
            font-weight: bold;
            color: #000;
            text-decoration: none;
            display: inline-block;
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <a href="https://skillnova-edtech-platform.vercel.app" class="brand-link">
            SkillNova - helping you learn better
        </a>
        <div class="heading">📩 New Contact Form Submission</div>
        <div class="details">
            <p><span class="highlight">First Name:</span> ${firstname}</p>
            <p><span class="highlight">Last Name:</span> ${lastname}</p>
            <p><span class="highlight">Email:</span> ${email}</p>
            <p><span class="highlight">Phone:</span> ${phone}</p>
        </div>
        <div>
            <p class="highlight">Message:</p>
            <div class="message-box">
                ${message}
            </div>
        </div>
    </div>
</body>
</html>`;
};
