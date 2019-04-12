import { useEffect, useRef } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Alert from "./Alert";
import { BUCKET_QUERY } from "../Bucket/Bucket";
import { Router } from "../../routes";

const CHECKOUT_MUTATION = gql`
	mutation CHECKOUT_MUTATION($token: String!) {
		checkoutBucket(token: $token) {
			id
			amount
			receipt
		}
	}
`;

const CheckoutForm = ({ stripe, checkoutState, resetState }) => {
	const formSubmitBtn = useRef();

	useEffect(() => {
		if (checkoutState) {
			formSubmitBtn.current.click();
		}
	}, [checkoutState]);

	const processStripe = checkoutMutation => {
		stripe.createToken().then(async ({ token, error }) => {
			if (!token) return resetState();
			const { data } = await checkoutMutation({ variables: { token: token.id } });
			if (
				window.confirm(
					`Payment of $${data.checkoutBucket.amount} completed.Click "yes" to see receipt`
				)
			) {
				Router.pushRoute(data.checkoutBucket.receipt);
			}
			resetState();
		});
	};

	return (
		<Mutation mutation={CHECKOUT_MUTATION} refetchQueries={[{ query: BUCKET_QUERY }]}>
			{(checkoutMutation, { error, loading }) => (
				<form
					onSubmit={e => {
						e.preventDefault();
						processStripe(checkoutMutation);
					}}
					id="bucket-form"
				>
					{error && <Alert danger="true" error={error} />}
					<label htmlFor="">Enter Card details :</label>
					<CardElement />
					<button ref={formSubmitBtn} style={{ display: "none" }} />
					{loading && <p className="msg-text">Transaction in process...</p>}
				</form>
			)}
		</Mutation>
	);
};

export default injectStripe(CheckoutForm);
