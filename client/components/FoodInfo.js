import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Head from 'next/head';
import { ButtonAddBucketStyle, FoodInfoStyle, TagListStyle, flexy } from '../styles/_index';
import AddToBucket from './Util/AddToBucket';
import Alert from './Util/Alert';
import { formatMoney } from '../util';
import { imageKitEndpoint } from '../data/config';

const ActionDivStyle = styled.div`
	${flexy};
	margin: 25px 0;
	font-size: 1.5em;
`;

export const FOOD_QUERY = gql`
	query FOOD_QUERY($id: ID!) {
		food(id: $id) {
			id
			name
			description
			price
			tags
			image
		}
	}
`;

const FoodInfo = ({ id }) => {
	const addFoodInBucket = (e, mutation) => {
		e.stopPropagation();
		return mutation();
	};

	return (
		<Query query={FOOD_QUERY} variables={{ id }}>
			{({ data, error, loading }) => {
				const { food } = data;
				if (loading) return <p className="msg-text">Loading...</p>;
				if (error) return <Alert danger="true" error={error} />;
				if (!food) {
					return (
						<>
							<Head>
								<title>Foodies | Not Found</title>
							</Head>
							<p className="msg-text">Food not found.</p>
						</>
					);
				}
				return (
					<>
						<Head>
							<title>Foodies | {food.name}</title>
						</Head>
						<FoodInfoStyle justifyContent="space-evenly">
							<img src={`${imageKitEndpoint}${food.image}`} alt={food.name} />
							<div className="food-details">
								<h2>{food.name}</h2>
								<p>{food.description}</p>
								<TagListStyle>
									{food.tags.split(',').map((tag, i) => {
										if (tag !== '') {
											return <li key={i}>{tag}</li>;
										}
									})}
								</TagListStyle>
								<ActionDivStyle justifyContent="space-between">
									<span className="price">{formatMoney.format(food.price)}</span>
									<AddToBucket foodId={food.id}>
										{(bucketMutation, { loading, error }) => (
											<>
												{error && <Alert danger="true" error={error} />}
												<ButtonAddBucketStyle
													width="auto"
													bg="#F4FF77"
													color="#222"
													radius="10px"
													boxShadow="0 5px 10px rgba(0,0,0,0.1)"
													onClick={(e) => addFoodInBucket(e, bucketMutation)}
													disabled={loading}
												>
													Add To Bucket
												</ButtonAddBucketStyle>
											</>
										)}
									</AddToBucket>
								</ActionDivStyle>
							</div>
						</FoodInfoStyle>
					</>
				);
			}}
		</Query>
	);
};

export default FoodInfo;
