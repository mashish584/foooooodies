const imagekit = require("imagekit");

// Imagekit Config
const image_kit = new imagekit({
	imagekitId: process.env.IMAGE_KIT_ID,
	apiKey: process.env.IMAGE_KIT_KEY,
	apiSecret: process.env.IMAGE_KIT_SECRET
});

// Imagekit upload & delete
exports.upload_on_imagekit = file => {
	return image_kit.upload(file.toString("base64"), {
		filename: "foodies.jpg",
		folder: "/foodies"
	});
};

exports.delete_image_from_imagekit = path => image_kit.deleteFile(path);
