const query = require("./query");
const mutation = require("./mutation");

module.exports = {
	Query: { ...query },
	Mutation: { ...mutation }
};
