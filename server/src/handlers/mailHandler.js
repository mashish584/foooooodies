const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const htmlToText = require("html-to-text");

const OAuth2Client = new OAuth2(
	process.env.MAIL_CLIENT_ID, // ClientID
	process.env.MAIL_CLIENT_SECRET, // Client Secret
	"https://developers.google.com/oauthplayground" // Redirect URL
);

// setting up oauth credential
OAuth2Client.setCredentials({
	refresh_token: process.env.MAIL_REFRESH_TOKEN
});

// generating access token
const accessToken = OAuth2Client.getAccessToken()
	.then(res => res.token)
	.catch(err => console.log(err));

const transport = nodemailer.createTransport({
	service: "gmail",
	auth: {
		type: "OAuth2",
		user: process.env.MAIL_USER,
		clientId: process.env.MAIL_CLIENT_ID,
		clientSecret: process.env.MAIL_CLIENT_SECRET,
		refreshToken: process.env.MAIL_REFRESH_TOKEN,
		accessToken: accessToken
	},
	tls: {
		rejectUnauthorized: false
	}
});

exports.send = ({ receiver, subject, message }) => {
	const mailOptions = {
		from: `Foodies <${process.env.MAIL_USER}>`,
		to: receiver,
		subject: subject,
		html: message,
		text: htmlToText.fromString(message)
	};
	return transport.sendMail(mailOptions);
};
