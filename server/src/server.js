require("dotenv").config({ path: "secret.env" });

const { GraphQLServer } = require("graphql-yoga");
const cookieParser = require("cookie-parser");
const { verify } = require("jsonwebtoken");
const db = require("./prisma-db");
const cors = require("cors");

// resolvers
const resolvers = require("./resolvers/_index");

//middlewares
const { yupMutationMiddleware } = require("./middlewares/yup_mutation");

const server = new GraphQLServer({
	typeDefs: "src/schema.graphql",
	resolvers,
	resolverValidationOptions: {
		requireResolversForResolveType: false
	},
	middlewares: [yupMutationMiddleware],
	context: req => {
		return {
			...req,
			db
		};
	}
});

// cookie parser middleware
server.express.use(
	cors({
		credentials: true,
		origin:
			process.env.MODE === "prod"
				? process.env.CLIENT_LIVE_ENDPOINT
				: process.env.CLIENT_ENDPOINT
	})
);
server.express.use(cookieParser());
server.express.use((req, res, next) => {
	const { token } = req.cookies;

	if (token) {
		const { userId } = verify(token, process.env.SECRET);
		req.userId = userId;
		console.log(`Current user is ${userId}`);
	}
	next();
});

server.express.use("/me", async (req, res, next) => {
	const { token } = req.cookies;
	let currentUser = null;
	if (token) {
		const { userId } = verify(token, process.env.SECRET);

		currentUser = await db.query.user(
			{ where: { id: userId } },
			`{id fullname email}`
		);
	}
	return res.status(200).json({ currentUser });
});

server.start(
	{
		cors: {
			credentials: true,
			origin:
				process.env.MODE === "prod"
					? process.env.CLIENT_LIVE_ENDPOINT
					: process.env.CLIENT_ENDPOINT
		}
	},
	({ port }) => console.log(`Server is running on port ${port}...`)
);
