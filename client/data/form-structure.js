export let SignInData = {
	email: {
		config: {
			elType: "email"
		},
		validation: {
			isRequired: true
		},
		value: "",
		valid: false,
		message: "",
		touched: false
	},
	password: {
		config: {
			elType: "password"
		},
		validation: {
			isRequired: true
		},
		value: "",
		valid: false,
		message: "",
		touched: false
	}
};

export let SignUpData = {
	fullname: {
		config: {
			elType: "text"
		},
		validation: {
			isRequired: true
		},
		value: "",
		valid: false,
		message: "",
		touched: false
	},
	...SignInData
};

export const AddFoodData = {
	name: {
		config: {
			elType: "text"
		},
		validation: {
			isRequired: true
		},
		value: "",
		valid: false,
		message: "",
		touched: false
	},
	price: {
		config: {
			elType: "number"
		},
		validation: {
			isRequired: true,
			isNumber: true
		},
		value: "",
		valid: false,
		message: "",
		touched: false
	},
	description: {
		config: {
			elType: "textarea"
		},
		validation: {
			isRequired: true
		},
		value: "",
		valid: false,
		message: "",
		touched: false
	},
	tags: {
		config: {
			elType: "text"
		},
		validation: {
			isRequired: false
		},
		helpText: "Tags should be seperated by (,)",
		value: "",
		valid: true,
		message: "",
		touched: false
	},
	upload: {
		config: {
			elType: "file"
		},
		validation: {
			isRequired: true,
			isImage: true
		},
		value: "",
		valid: false,
		message: "",
		touched: false
	}
};
