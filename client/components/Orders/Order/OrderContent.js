import { OrderContentStyle } from "../../../styles/_index";
import { imageKitEndpoint } from "../../../data/config";
import { formatMoney } from "../../../util";

const OrderContent = ({ item }) => (
	<OrderContentStyle justifyContent="space-around">
		<div>
			<img src={`${imageKitEndpoint}${item.image}`} alt={item.name} />
			<small>
				<span>{item.name}</span>
				<span>
					{formatMoney.format(item.price)} X {item.qty}
				</span>
			</small>
		</div>
		<span>{formatMoney.format(item.price * item.qty)}</span>
	</OrderContentStyle>
);

export default OrderContent;
