import FoodForm from "../../components/FoodForm";

const addFood = () => {
	return <FoodForm />;
};

export default UnauthGuard(addFood);
