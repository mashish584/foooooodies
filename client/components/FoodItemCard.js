import { ButtonAddBucketStyle } from "../styles/_index";
import AddToBucket from "../components/Util/AddToBucket";
import Alert from "./Util/Alert";
import { imageKitEndpoint } from "../data/config";
import { formatMoney } from "../util";

const FoodItemCard = ({ food, changeRoute }) => {
	const addFoodInBucket = (e, mutation) => {
		e.stopPropagation();
		return mutation();
	};

	return (
		<div onClick={() => changeRoute(food.id)} className="item">
			<img src={`${imageKitEndpoint}${food.image}`} alt={food.name} />
			<div className="item-details">
				<h2>{food.name}</h2>
				<p>{food.description.substring(0, 95)}...</p>
				<span className="price">{formatMoney.format(food.price)}</span>
				<AddToBucket foodId={food.id}>
					{(bucketMutation, { loading, error }) => (
						<>
							{error && <Alert danger="true" error={error} />}
							<ButtonAddBucketStyle
								left
								width="135px"
								bg="#222"
								color="#F4FF77"
								radius="50px"
								onClick={e => addFoodInBucket(e, bucketMutation)}
								disabled={loading}
							>
								Add To Bucket
							</ButtonAddBucketStyle>
						</>
					)}
				</AddToBucket>
			</div>
		</div>
	);
};

export default FoodItemCard;
