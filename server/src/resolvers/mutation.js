const yup = require("yup");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const { upload_on_imagekit } = require("../handlers/uploadHandler");
const { S2B } = require("../util");
const db = require("../prisma-db");

exports.createUser = {
	validation: yup.object().shape({
		fullname: yup
			.string()
			.trim()
			.min(3, "Fullname must have minimum 3 characters"),
		email: yup
			.string()
			.trim()
			.email("Email address is invalid")
			.test("email-exist", "Email already exist.", async function(value) {
				const user = await db.query.user({ where: { email: value } });
				return user ? false : true;
			}),
		password: yup.string().min(7, "Password must have minimum 7 characters")
	}),
	resolve: (parent, args, ctx, info) => {
		// TODO: Create & return User
		return ctx.db.mutation.createUser(
			{
				data: {
					...args,
					password: bcrypt.hashSync(args.password, 10)
				}
			},
			info
		);
	}
};

exports.authUser = async (parent, args, ctx, info) => {
	// TODO: Destruct email and password
	const { email, password } = args;
	// TODO: Validate values
	if (!email.trim() || !password) {
		throw new Error("Email and Password fields are mandatory.");
	}
	// TODO: Find user, If true compare password and create token
	const user = await ctx.db.query.user({ where: { email } });
	if (user) {
		if (bcrypt.compareSync(password, user.password)) {
			// TODO: Save token in cookie
			const token = sign({ userId: user.id }, process.env.SECRET);
			ctx.response.cookie("token", token, {
				httpOnly: true,
				maxAge: 1000 * 60 * 60 * 24 //1 day
			});
			// TODO: return token and message
			return {
				message: "Login success...",
				token
			};
		}
	}
	//! Throw error
	throw new Error("Credentials not matched.");
};

exports.userLogout = (parent, args, ctx, info) => {
	ctx.response.clearCookie("token");
	return {
		token: null,
		message: "Logout successfull."
	};
};

exports.addFood = {
	validation: yup.object().shape({
		name: yup.string().required(),
		price: yup
			.number()
			.required()
			.positive()
			.integer()
			.min(1, "Price should be greater than 0"),
		description: yup
			.string()
			.required()
			.min(27)
	}),
	resolve: async (parent, args, ctx, info) => {
		// TODO: Get user id from request context and throw error immediately if doesn't exist
		const { userId } = ctx.request;
		if (!userId) throw new Error("Please SignIn..");

		// TODO: Get upload & delete it from args object
		const upload = await args.upload;
		delete args.upload;

		//TODO: Upload validation
		if (!upload) throw new Error("Please upload");
		if (!upload.mimetype.includes("image")) throw new Error("Invalid Upload");

		// TODO: Stream to Buffer conversion
		const buffer = await S2B(upload.createReadStream());

		// TODO: Image upload on imagekit server
		const { imagePath } = await upload_on_imagekit(buffer);

		// TODO : Save Food & return
		return ctx.db.mutation.createFood(
			{
				data: {
					...args,
					image: imagePath
				}
			},
			info
		);
	}
};

exports.addFoodToBucket = async (parent, { foodId, action }, ctx, info) => {
	// TODO: Get user id from request context and throw error immediately if doesn't exist
	const { userId } = ctx.request;
	if (!userId) throw new Error("Please SignIn..");

	// TODO: Look for a food in Bucket
	const [bucketItem] = await ctx.db.query.bucketItems({
		where: { user: { id: userId }, food: { id: foodId } }
	});

	// TODO: If exist or action="+" increase quantity else decrease quantity
	if (bucketItem) {
		// return bucketItem immediately if acttion="-" and qty is 1
		if (bucketItem.qty === 1 && action !== "+") return bucketItem;
		// update bucketItem quantity
		return ctx.db.mutation.updateBucketItem(
			{
				where: { id: bucketItem.id },
				data: {
					qty: action === "+" ? bucketItem.qty + 1 : bucketItem.qty - 1
				}
			},
			info
		);
	}

	// TODO: If not-exist add food
	return ctx.db.mutation.createBucketItem(
		{
			data: {
				food: {
					connect: { id: foodId }
				},
				user: {
					connect: { id: userId }
				}
			}
		},
		info
	);
};

exports.removeFoodFromBucket = (parent, { bucketId }, ctx, info) => {
	// TODO: Get user id from request context and throw error immediately if doesn't exist
	const { userId } = ctx.request;
	if (!userId) throw new Error("Please SignIn..");

	// delete and return bucketItem
	return ctx.db.mutation.deleteBucketItem({ where: { id: bucketId } }, info);
};

exports.checkoutBucket = async (parent, { token }, ctx, info) => {
	// TODO: Get user id from request context and throw error immediately if doesn't exist
	const { userId } = ctx.request;
	if (!userId) throw new Error("Please SignIn..");

	// TODO: Get user bucketItems where qty > 0 & calculate total
	const bucket = await ctx.db.query.bucketItems(
		{
			where: { user: { id: userId }, qty_gt: 0 }
		},
		`{food {name price image} qty }`
	);

	const totalAmount = bucket.reduce(
		(prev, { food, qty }) => prev + food.price * qty,
		0
	);

	// TODO: Do Stripe checkout
	const charge = await stripe.charges.create({
		amount: totalAmount * 100,
		currency: "usd",
		description: `${bucket.length} items purchased for worth $${totalAmount}.`,
		source: token
	});

	// TODO: Create orderItem Object
	const items = bucket.map(({ food, qty }) => ({
		name: food.name,
		price: food.price,
		image: food.image,
		qty: qty
	}));

	// TODO: Delete user bucketItems
	await ctx.db.mutation.deleteManyBucketItems({ where: { user: { id: userId } } });

	// TODO: Create and return Order
	return ctx.db.mutation.createOrder({
		data: {
			items: { create: items }, //creating orderItem on the go
			transactionId: charge.id,
			amount: totalAmount,
			status: charge.status,
			user: {
				connect: {
					id: userId
				}
			},
			receipt: charge.receipt_url
		}
	});
};
