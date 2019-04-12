import { useEffect } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Head from "next/head";
import useGuard from "../../hooks/useGuard";
import Order from "./Order/Order";
import Alert from "../Util/Alert";
import { OrderStyle } from "../../styles/_index";

export const ORDERS_QUERY = gql`
	query ORDERS_QUERY {
		orders {
			id
			items {
				image
				name
				price
				qty
			}
			receipt
			transactionId
			amount
			createdAt
		}
	}
`;

const Orders = () => {
	const [authState, checkAuth] = useGuard(false);

	useEffect(() => {
		checkAuth();
	}, []);

	return (
		!authState && (
			<OrderStyle>
				<h2>My Orders</h2>
				<Head>
					<title>Foodies | My Orders</title>
				</Head>
				<Query query={ORDERS_QUERY}>
					{({ data, error, loading }) => {
						if (loading) {
							return <p className="msg-text">Loading...</p>;
						}

						if (error) return <Alert dange="true" error={error} />;

						if (data.orders && !data.orders.length) {
							return <p className="msg-text">No Food Available..</p>;
						}

						return data.orders.map(order => <Order key={order.id} order={order} />);
					}}
				</Query>
			</OrderStyle>
		)
	);
};

export default Orders;
