import { NavigationStyle } from "../../../styles/_index";
import NavigationItem from "./NavigationItem";
import UserLogout from "../UserLogout";
import CheckAuth from "../../Util/CheckAuth";

const Navigation = ({ currentUser }) => {
	return (
		<NavigationStyle flexBasis={currentUser ? "500px" : "300px"} justifyContent="space-evenly">
			{currentUser && (
				<>
					<NavigationItem path="/add/food">Add Food</NavigationItem>
					<NavigationItem path="/orders">Orders</NavigationItem>
					<NavigationItem path="/bucket">Bucket</NavigationItem>
					<UserLogout />
				</>
			)}
			{!currentUser && <NavigationItem path="/signin">SignIn</NavigationItem>}
		</NavigationStyle>
	);
};

export default CheckAuth(Navigation);
