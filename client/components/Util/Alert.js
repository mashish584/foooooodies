import { useState } from "react";
import styled from "styled-components";

const AlertStyle = styled.div`
	position: fixed;
	width: 500px !important;
	left: 50%;
	margin-left: -250px;
	padding: 15px;
	top: 100px;

	background: #fff;
	color: ${props => (props.danger ? props.theme.danger : props.theme.success)};
	box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.2);
	animation: slideIn 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
	&.hide {
		animation: slideOut 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
	}
	span {
		float: right;
		margin-top: 2px;
		color: #222;
	}
	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(-200px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	@keyframes slideOut {
		from {
			opacity: 1;
			transform: translateY(0);
		}
		to {
			opacity: 0;
			transform: translateY(-200px);
		}
	}
`;

const Alert = ({ danger, error: { graphQLErrors, networkError }, children }) => {
	const [hide, setHide] = useState(false);
	let message = "";

	if (danger && graphQLErrors && graphQLErrors.length) {
		message = graphQLErrors[0].message;
	}

	if (danger && networkError) {
		message = `[Network Error] : ${networkError} `;
	}

	return (
		<AlertStyle className={hide ? "hide" : ""} danger={danger}>
			{danger ? message : children}
			<span
				onClick={e => {
					e.stopPropagation();
					setHide(true);
				}}
				className="fa fa-close"
			/>
		</AlertStyle>
	);
};

export default Alert;
