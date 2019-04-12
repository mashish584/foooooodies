import { calculateTotalPrice, formatMoney } from "../../util";
import { BucketListMeta, ButtonPayStyle } from "../../styles/_index";
import StripeForm from "../Util/StripeForm";

const BucketFooter = ({ bucket, payState, setPayState, resetPayState }) => (
	<BucketListMeta>
		<>
			{bucket.length > 0 && <StripeForm checkoutState={payState} resetState={resetPayState} />}
			<div id="bucket-info">
				<span>Total : {bucket && formatMoney.format(calculateTotalPrice(bucket))}</span>
				{bucket.length > 0 && (
					<ButtonPayStyle disabled={payState} onClick={setPayState}>
						PAY
					</ButtonPayStyle>
				)}
			</div>
		</>
	</BucketListMeta>
);

export default BucketFooter;
