const { ValidationError } = require("yup");

exports.yupMutationMiddleware = {
	async Mutation(resolve, parent, args, ctx, info) {
		const { validation } = info.schema.getMutationType().getFields()[
			info.fieldName
		];

		// validate the args against validation object of mutation
		if (validation) {
			try {
				await validation.validate(args, { abortEarly: false });
			} catch (err) {
				if (err instanceof ValidationError) {
					const errors = err.inner.map(({ path, message }) => ({
						path,
						message
					}));
					throw new Error(errors[0].message);
				} else {
					throw err;
				}
			}
		}

		return resolve(parent, args, ctx, info);
	}
};
