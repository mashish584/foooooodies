import { css } from "styled-components";

export const flexBasis = css`
	flex-basis: ${props => props.flexBasis};
`;

export const flexy = css`
	display: flex;
	flex-direction: ${props => (props.flexDir ? props.flexDir : "row")};
	flex-wrap: ${props => (props.wrap ? "wrap" : "nowrap")};
	align-items: ${props => (props.alignItem ? props.alignItem : "center")};
	justify-content: ${props => props.justifyContent};
	${flexBasis}
`;
