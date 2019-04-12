import styled from "styled-components";

export const TagListStyle = styled.ul`
	li {
		display: inline-block;
		background: ${props => props.theme.foodies};
		color: ${props => props.theme.black};
		border-radius: 50px;
		padding: 5px 10px;
		font-size: 0.7em;
		margin: 5px;
		&:first-child {
			margin-left: 0;
		}
	}
`;
