import { Elements } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm";

const StripeForm = ({ checkoutState, resetState }) => (
	<Elements>
		<CheckoutForm checkoutState={checkoutState} resetState={resetState} />
	</Elements>
);

export default StripeForm;
