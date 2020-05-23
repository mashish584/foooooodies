const { forwardTo } = require('prisma-binding');

exports.currentUser = (parent, args, ctx, info) => {
	const { request: req, db } = ctx;
	// check if user exist in request or not
	if (!req.userId) return null;

	// find and return user
	return db.query.user({ where: { id: req.userId } }, info);
};

exports.foods = (parent, args, ctx, info) =>
	ctx.db.query.foods(
		{
			skip: args.skip,
			first: args.first,
			orderBy: 'createdAt_DESC',
			where: { isApproved: true },
		},
		info,
	);

exports.food = (parent, { id }, ctx, info) => ctx.db.query.food({ where: { id } }, info);

exports.foodsConnection = forwardTo('db');

exports.bucket = (parent, args, ctx, info) => {
	// TODO: Get user id from request context and throw error immediately if doesn't exist
	const { userId } = ctx.request;
	if (!userId) throw new Error('Please SignIn..');

	return ctx.db.query.bucketItems(
		{ where: { user: { id: userId } }, orderBy: 'createdAt_DESC' },
		info,
	);
};

exports.orders = (parent, args, ctx, info) => {
	// TODO: Get user id from request context and throw error immediately if doesn't exist
	const { userId } = ctx.request;
	if (!userId) throw new Error('Please SignIn..');

	return ctx.db.query.orders(
		{ where: { user: { id: userId } }, orderBy: 'createdAt_DESC' },
		info,
	);
};
