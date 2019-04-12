import styled from "styled-components";
import { flexy } from "./Mixin";

export const OrderStyle = styled.div`
	width: 900px;
	margin: 25px auto;
	h2 {
		margin-bottom: 25px;
	}
`;

export const OrderContainerStyle = styled.div`
	width: 100%;
	border: 2px solid #dcdcdc;
	margin-bottom: 25px;
`;

export const OrderHeaderStyle = styled.div`
	${flexy}
	background: #f5f5f5;
	height: 75px;
	padding: 0 10px;
`;

export const OrderContentStyle = styled.div`
	${flexy}
	border-bottom: 1px solid #f5f5f5;
	min-height: 75px;

	div {
		img {
			width: 55px;
			margin-right: 10px;
		}
		span {
			display: block;
		}
		${flexy}
		justify-content:flex-start;
		flex-basis: 80%;
		padding: 10px;
	}
`;

export const OrderFooterStyle = styled.div`
	border-top: 1px solid #dcdcdc;
	padding: 10px 0;
	background: #f5f5f5;

	p {
		padding: 10px;
		> b,
		a {
			float: right;
		}
	}
`;
