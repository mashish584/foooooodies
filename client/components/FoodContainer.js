import { Query } from "react-apollo";
import gql from "graphql-tag";
import Head from "next/head";
import { Router } from "../routes";
import { limit } from "../data/config";
import { FoodContainerStyle } from "../styles/_index";
import FoodItemCard from "./FoodItemCard";
import Alert from "./Util/Alert";

export const FOODS_QUERY = gql`
	query foods($skip: Int, $first: Int) {
		foods(skip: $skip, first: $first) {
			id
			name
			description
			image
			price
		}
	}
`;

const FoodContainer = ({ page }) => {
	const goToFoodPage = foodId => {
		Router.pushRoute(`/food/${foodId}`);
	};

	return (
		<FoodContainerStyle wrap="true">
			<Head>
				<title>Foodies | Home</title>
			</Head>
			<Query
				fetchPolicy="network-only"
				query={FOODS_QUERY}
				variables={{ skip: page * limit - limit, first: limit }}
			>
				{({ data, error, loading }) => {
					if (loading) {
						return <p className="msg-text">Loading...</p>;
					}

					if (error) return <Alert danger="true" error={error} />;

					if (data.foods && !data.foods.length) {
						return <p className="msg-text">No Food Available..</p>;
					}

					return data.foods.map(food => (
						<FoodItemCard key={food.id} changeRoute={goToFoodPage} food={food} />
					));
				}}
			</Query>
		</FoodContainerStyle>
	);
};

export default FoodContainer;
