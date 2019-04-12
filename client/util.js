export const firstUC = string => `${string.substring(0, 1).toUpperCase()}${string.substring(1)}`;

export const getFormValues = formElement => {
	const obj = {};
	for (let key in formElement) {
		obj[key] = key === "price" ? parseInt(formElement[key].value, 10) : formElement[key].value;
	}
	return obj;
};

export const calculateTotalPrice = bucket =>
	bucket.reduce((total, { food, qty }) => food.price * qty + total, 0);

export const formatMoney = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 2
});
