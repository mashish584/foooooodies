import styled, { css } from "styled-components";

const LeftAlign = css`
	display: block;
	margin-left: auto;
`;

const Button = styled.button`
	padding: 10px;
	background: #dcdcdc;
	color: #222;
	border: none;
	cursor: pointer;
	font-size: 1.1em;
`;

export const ButtonSubmitStyle = styled(Button)`
	padding: 15px;
	background: #ebfd19;
`;

export const ButtonPayStyle = styled(Button)`
	background: ${props => props.theme.foodies};
	color: ${props => (props.color ? props.color : props.theme.black)};
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	padding: 15px;
	border-radius: 5px;
	margin-top: 15px;
`;

export const ButtonAddBucketStyle = styled(Button)`
	width: ${props => props.width};
	background: ${props => (props.bg ? props.bg : props.theme.foodies)};
	color: ${props => (props.color ? props.color : props.theme.black)};
	border-radius: ${props => props.radius};
	text-transform: uppercase;
	font-weight: 800;
	font-size: 0.7em;
	box-shadow: ${props => (props.boxShadow ? props.boxShadow : "none")};
	${props => (props.left ? LeftAlign : "")};
`;
