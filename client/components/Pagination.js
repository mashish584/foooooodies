import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import { Link } from "../routes";
import { limit } from "../data/config";
import { flexy } from ".././styles/_index";
import Alert from "./Util/Alert";

const PaginationStyle = styled.div`
	width: 300px;
	${flexy}
	margin: 25px auto;
	a {
		color: ${props => props.theme.black};
		text-decoration: underline;
	}
	span {
		color: #a9a9a9;
		margin: 0 15px;
	}
	a[aria-disabled="true"] {
		opacity: 0.5;
		pointer-events: none;
	}
`;

export const FOODS_CONNECTION_QUERY = gql`
	query FOODS_CONNECTION_QUERY {
		foodsConnection {
			aggregate {
				count
			}
		}
	}
`;

const Pagination = ({ page }) => (
	<Query query={FOODS_CONNECTION_QUERY}>
		{({ data, error, loading }) => {
			if (error) return <Alert error={error} danger="true" />;
			return (
				<>
					{!loading && data.foodsConnection.aggregate.count > 0 && (
						<PaginationStyle justifyContent="space-evenly">
							<Link prefetch route={`/foods/${page - 1}`}>
								<a aria-disabled={page === 1 ? "true" : "false"}>
									<i className="fa fa-angle-left" />
									<i className="fa fa-angle-left" /> Prev{" "}
								</a>
							</Link>
							<span>
								Page {page} of {Math.ceil(data.foodsConnection.aggregate.count / limit)}
							</span>
							<Link prefetch route={`/foods/${page + 1}`}>
								<a
									aria-disabled={
										page === Math.ceil(data.foodsConnection.aggregate.count / limit)
											? "true"
											: "false"
									}
								>
									Next <i className="fa fa-angle-right" />
									<i className="fa fa-angle-right" />
								</a>
							</Link>
						</PaginationStyle>
					)}
				</>
			);
		}}
	</Query>
);

export default Pagination;
