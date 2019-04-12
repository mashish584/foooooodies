import styled from "styled-components";
import { flexy } from "./Mixin";
import { flexWidth } from "./util";

export const FoodContainerStyle = styled.div`
	${flexy};
	margin-top: 55px;
	padding: 0 25px;
	.item {
		${flexy};
		margin: 1.5%;
		background: ${props => props.theme.foodies};
		flex-basis: ${flexWidth(3, 1.5)};
		flex-wrap: nowrap;
		border-radius: 10px;
		max-height: 195px;
		cursor: default;
		img {
			width: 155px;
			margin-left: -35px;
			margin-right: 5px;
		}

		&-details {
			padding: 10px 10px 15px;
			font-size: 16px;
			font-family: ${props => props.theme.fontTwo};
			h2 {
				font-size: 1.2em;
				margin: 10px 0;
			}
			p {
				font-size: 0.8em;
				margin: 10px 0;
			}
		}
	}
`;
