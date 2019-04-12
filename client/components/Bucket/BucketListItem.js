import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { BucketListContent } from "../../styles/_index";
import AddToBucket from "../Util/AddToBucket";
import Alert from "../Util/Alert";
import { imageKitEndpoint } from "../../data/config";
import { formatMoney } from "../../util";
import { BUCKET_QUERY } from "./Bucket";

export const REMOVE_BUCKET_ITEM_MUTATION = gql`
	mutation REMOVE_BUCKET_ITEM_MUTATION($bucketId: ID!) {
		removeFoodFromBucket(bucketId: $bucketId) {
			id
		}
	}
`;

const BucketListItem = ({ item }) => {
	const { id, food, qty } = item;

	const updateBucketQty = (bucketMutation, { id, qty, food, user }, action = "+") => {
		if (action !== "+" && qty === 1) {
			return;
		}
		bucketMutation({
			optimisticResponse: {
				__typename: "Mutation",
				addFoodToBucket: {
					id,
					__typename: "BucketItem",
					qty: action === "+" ? qty + 1 : qty - 1,
					food: {
						...food
					},
					user: {
						...user
					}
				}
			}
		});
	};

	const removeBucketQueryCache = (store, payload) => {
		const data = store.readQuery({ query: BUCKET_QUERY });
		store.writeQuery({
			query: BUCKET_QUERY,
			data: {
				...data,
				bucket: data.bucket.filter(item => item.id !== payload.data.removeFoodFromBucket.id)
			}
		});
	};

	return (
		<BucketListContent key={food.id}>
			<div>
				<img src={`${imageKitEndpoint}${food.image}`} alt={food.name} />
				<span>
					{food.name} <b>{formatMoney.format(food.price)}</b>
					<Mutation
						mutation={REMOVE_BUCKET_ITEM_MUTATION}
						variables={{ bucketId: id }}
						update={removeBucketQueryCache}
					>
						{(deleteBucketItem, { error, loading }) => (
							<>
								{error && <Alert danger="true" error={error} />}
								<i
									onClick={deleteBucketItem}
									style={{
										color: "#ff0000",
										fontStyle: "inherit",
										cursor: "pointer",
										textDecoration: "underline"
									}}
								>
									Remov{loading ? "ing" : "e"}
								</i>
							</>
						)}
					</Mutation>
				</span>
			</div>
			<div>
				<AddToBucket foodId={food.id}>
					{bucketMutation => (
						<span onClick={() => updateBucketQty(bucketMutation, item)}>
							<i className="fa fa-plus" />
						</span>
					)}
				</AddToBucket>
				<b>{qty}</b>
				<AddToBucket foodId={food.id} action="-">
					{bucketMutation => (
						<span onClick={() => updateBucketQty(bucketMutation, item, "-")}>
							<i className="fa fa-minus" />
						</span>
					)}
				</AddToBucket>
			</div>
			<div>{formatMoney.format(food.price)}</div>
		</BucketListContent>
	);
};

export default BucketListItem;
