import styled from "styled-components";
import { flexy } from "../styles/Mixin";

export const BucketStyle = styled.div`
	width: 900px;
	margin: 25px auto;
`;

export const BucketListHeader = styled.div`
	${flexy};
	margin-top: 25px;
	padding: 10px;
	border-bottom: 1px solid #a9a9a9;
	span {
		color: #a9a9a9;
		width: 150px;
		&:first-child {
			width: 600px;
		}
	}
`;

export const BucketListContent = styled.div`
	${flexy};
	padding: 10px 0;
	height: 100px;
	&:not(:last-child) {
		border-bottom: 1px solid #dcdcdc;
	}
	div {
		width: 150px;
		&:first-child {
			width: 600px;
			${flexy};
			img {
				width: 75px;
				max-height: 100px;
				margin-right: 15px;
			}
			span {
				margin-top: -5px;
			}
			span b {
				display: block;
			}
		}
		&:nth-child(2) {
			span {
				color: #a9a9a9;
				cursor: pointer;
			}
			b {
				margin: 0 25px;
			}
		}
		&:last-child {
			color: ${props => props.theme.success};
		}
	}
`;

export const BucketListMeta = styled.div`
	${flexy};
	margin-top: 55px;
	background: #f5f5f5;
	padding: 15px;
	#bucket {
		&-form {
			align-self: flex-start;
			width: 450px;
		}
		&-info {
			margin-left: auto;
			span {
				font-size: 1.3em;
			}
		}
	}
`;
