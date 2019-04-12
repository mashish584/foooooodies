import FoodForm from "../../components/FoodForm";
import UnauthGuard from "../../guards/UnauthGuard";

const addFood = () => {
	return <FoodForm />;
};

export default UnauthGuard(addFood);
