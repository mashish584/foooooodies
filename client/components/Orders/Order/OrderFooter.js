import { OrderFooterStyle } from "../../../styles/_index";
import { formatMoney } from "../../../util";

const OrderFooter = ({ amount, transactionId, receipt }) => (
	<OrderFooterStyle>
		<p>
			Amount Paid : <b>{formatMoney.format(amount)}</b>
		</p>
		<p>
			Transaction Id : <b>{transactionId}</b>
		</p>
		<p>
			Receipt :{" "}
			<a style={{ textDecoration: "underline" }} target="_blank" href={receipt}>
				See Receipt
			</a>
		</p>
	</OrderFooterStyle>
);

export default OrderFooter;
