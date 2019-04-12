import { Query } from "react-apollo";
import gql from "graphql-tag";
import Alert from "./Alert";

export const CURRENT_USER_QUERY = gql`
	query {
		currentUser {
			id
			fullname
			email
		}
	}
`;

function CheckAuth(Component) {
	return props => (
		<Query query={CURRENT_USER_QUERY}>
			{({ data, error }) => {
				return (
					<>
						{error && <Alert danger={true} error={error} />}
						<Component currentUser={data ? data.currentUser : null} {...props} />
					</>
				);
			}}
		</Query>
	);
}

export default CheckAuth;
