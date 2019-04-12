import OrderHeader from "./OrderHeader";
import OrderContent from "./OrderContent";
import OrderFooter from "./OrderFooter";
import { OrderContainerStyle } from "../../../styles/_index";

const Order = ({ order }) => {
	return (
		<OrderContainerStyle>
			<OrderHeader orderId={order.id} date={order.createdAt} />
			{order.items.map((item, index) => (
				<OrderContent key={index} item={item} />
			))}
			<OrderFooter
				amount={order.amount}
				transactionId={order.transactionId}
				receipt={order.receipt}
			/>
		</OrderContainerStyle>
	);
};

export default Order;
