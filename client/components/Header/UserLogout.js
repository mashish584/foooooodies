import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Router } from "../../routes";
import { CURRENT_USER_QUERY } from "../Util/CheckAuth";

const LOGOUT_MUTATION = gql`
	mutation LOGOUT_MUTATION {
		userLogout {
			message
		}
	}
`;

const UserLogout = () => {
	return (
		<Mutation mutation={LOGOUT_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
			{userLogout => (
				<a
					style={{ cursor: "pointer" }}
					onClick={() => {
						userLogout();
						Router.pushRoute("/");
					}}
				>
					Sign Out
				</a>
			)}
		</Mutation>
	);
};

export default UserLogout;
