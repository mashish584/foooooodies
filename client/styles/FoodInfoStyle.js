import styled from "styled-components";
import { flexy } from "./Mixin";

export const FoodInfoStyle = styled.div`
	${flexy};
	font-family: ${props => props.theme.fontTwo};
	margin: 25px 50px;
	font-size: 1.3=em;
	img {
		width: 400px;
	}
	.food-details {
		flex-basis: 500px;
		h2,
		p,
		ul {
			margin: 15px 0;
		}
		h2 {
			font-size: 2.5em;
		}
		p {
			font-size: 1em;
			line-height: 1.5em;
			text-align: justify;
		}
	}
`;
