import Pagination from "../components/Pagination";
import FoodContainer from "../components/FoodContainer";

const Index = ({ query, currentUser }) => {
	const page = parseInt(query.page, 10) || 1;
	return (
		<>
			<FoodContainer page={page} />
			<Pagination page={page} />
		</>
	);
};

export default Index;
