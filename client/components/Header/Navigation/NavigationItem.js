import Link from "../../Util/ActiveLink";

const NavigationItem = ({ path, children }) => {
	return (
		<li>
			<Link className="active" href={path}>
				{children}
			</Link>
		</li>
	);
};

export default NavigationItem;
