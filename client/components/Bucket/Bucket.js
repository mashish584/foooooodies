import { useState, useEffect } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Head from "next/head";
import { BucketStyle } from "../../styles/_index";
import useGuard from "../../hooks/useGuard";
import BucketListItem from "./BucketListItem";
import BucketHead from "./BucketHead";
import BucketFooter from "./BucketFooter";
import Alert from "../Util/Alert";

export const BUCKET_QUERY = gql`
	query BUCKET_QUERY {
		bucket {
			id
			qty
			food {
				id
				image
				name
				price
			}
			user {
				id
				fullname
			}
		}
	}
`;

const Bucket = () => {
	const [checkoutState, setCheckoutState] = useState(false);
	const [authState, checkAuth] = useGuard(false);

	useEffect(() => {
		checkAuth();
	}, []);

	return (
		!authState && (
			<BucketStyle>
				<h2>My Bucket</h2>
				<Head>
					<title>Foodies | My Bucket</title>
				</Head>
				<Query query={BUCKET_QUERY}>
					{({ error, data, loading }) => {
						if (loading) return <p className="msg-text">Loading...</p>;
						if (error) return <Alert danger="true" error={error} />;
						if (data && data.bucket)
							return (
								<>
									<BucketHead />
									{!data.bucket.length && <p className="msg-text">Bucket is empty.</p>}
									{data.bucket.map(item => (
										<BucketListItem key={item.id} item={item} />
									))}
									<BucketFooter
										bucket={data.bucket}
										payState={checkoutState}
										resetPayState={() => setCheckoutState(false)}
										setPayState={() => setCheckoutState(true)}
									/>
								</>
							);
					}}
				</Query>
			</BucketStyle>
		)
	);
};

export default Bucket;
