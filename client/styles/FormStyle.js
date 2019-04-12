import styled, { css } from "styled-components";

const inputCSS = css`
	font-size: 20px;
	background: #f5f5f5;
	border: none;
	padding: 15px;
	border: 1px solid #f5f5f5;
	&.error {
		border-color: #ff0000;
		margin: 2px 0;
	}
	&:focus {
		outline: none;
		background: #fff;
	}
`;

export const FormStyle = styled.form`
	width: ${props => (props.width ? props.width : "300px")};
	padding: 10px;
	background: ${props => props.bg};
	margin: ${props => (props.margin ? props.margin : "25px auto")};
	.input-group {
		margin: 10px 0;
	}
`;

export const InputStyle = styled.input`
	${inputCSS}
`;

export const TextAreaStyle = styled.textarea`
	${inputCSS}
	resize:none;
`;

export const InputErrorStyle = styled.span`
	color: #ff0000;
	font-size: 0.7em;
`;
