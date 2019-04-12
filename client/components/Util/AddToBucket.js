import { Mutation } from "react-apollo";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { BUCKET_QUERY } from "../Bucket/Bucket";

export const ADD_TO_BUCKET_MUTATION = gql`
	mutation ADD_TO_BUCKET_MUTATION($foodId: ID!, $action: String = "+") {
		addFoodToBucket(foodId: $foodId, action: $action) {
			id
			qty
			food {
				id
				image
				name
				price
			}
			user {
				id
				fullname
			}
		}
	}
`;

const updateBucketQueryCache = (store, payload) => {
	if (store.data.data.ROOT_QUERY && store.data.data.ROOT_QUERY.bucket) {
		const data = store.readQuery({ query: BUCKET_QUERY });
		const itemExist = data.bucket.find(item => item.id === payload.data.addFoodToBucket.id);
		if (!itemExist) {
			data.bucket.unshift(payload.data.addFoodToBucket);
		}
		store.writeQuery({ query: BUCKET_QUERY, data });
	}
};

const AddToBucket = ({ children, foodId, action }) => (
	<Mutation
		mutation={ADD_TO_BUCKET_MUTATION}
		variables={{ foodId, action }}
		update={updateBucketQueryCache}
	>
		{(addToBucket, payload) => children(addToBucket, payload)}
	</Mutation>
);

AddToBucket.propTypes = {
	children: PropTypes.func.isRequired,
	foodId: PropTypes.string.isRequired,
	action: PropTypes.string
};

export default AddToBucket;
