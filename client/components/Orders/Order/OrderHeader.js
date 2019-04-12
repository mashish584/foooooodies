import moment from "moment";
import { OrderHeaderStyle } from "../../../styles/_index";

const OrderHeader = ({ orderId, date }) => (
	<OrderHeaderStyle justifyContent="space-between">
		<span>
			Order Id : <b>{orderId}</b>
		</span>
		<span>
			Placed on: <b>{moment(date).format("LL")}</b>
		</span>
	</OrderHeaderStyle>
);

export default OrderHeader;
