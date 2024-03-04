require("dotenv").config();
const twilio = require("twilio");

const client = new twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

const otpGenerator = () => {
    return new Promise((resolve, reject) => {
        let otp = ~~Math.floor(1000 + Math.random() * 9000);
        if (otp) resolve(otp);
        reject(otp);
    });
};

module.exports = { otpGenerator, client };
