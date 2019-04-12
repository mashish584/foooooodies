import styled from "styled-components";
import { flexy } from "./Mixin";

export const NavigationStyle = styled.ul`
	${flexy}
	a {
		color: #222;
		&.active {
			font-weight: 800;
		}
	}
`;
