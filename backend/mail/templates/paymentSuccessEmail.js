exports.paymentSuccessEmail = (name, amount, orderId, paymentId) => {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Payment Confirmation</title>
    <style>
        body {
            background-color: #ffffff;
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
        }
        .message {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .body {
            font-size: 16px;
            margin-bottom: 20px;
        }
        .highlight {
            font-weight: bold;
        }
        .support {
            font-size: 14px;
            color: #999999;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <a href="https://skillnova-edtech-platform.vercel.app" style="font-size:20px; font-weight:bold; text-decoration:none; color:#000;">
            SkillNova - helping you learn better
        </a>
        <div class="message">Course Payment Confirmation</div>
        <div class="body">
            <p>Dear ${name},</p>
            <p>We have received a payment of <span class="highlight">₹${amount}</span>.</p>
            <p>Your Payment ID is <b>${paymentId}</b></p>
            <p>Your Order ID is <b>${orderId}</b></p>
        </div>
        <div class="support">
            If you have any questions or need assistance, please feel free to reach out to us at 
            <a href="mailto:info@studynotion.com">info@studynotion.com</a>. We are here to help!
        </div>
    </div>
</body>
</html>`;
};
