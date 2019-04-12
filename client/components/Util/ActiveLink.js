import { withRouter } from "next/router";
import { Link } from "../../routes";

const ActiveLink = ({ children, href, router, className }) => {
	return (
		<Link route={href}>
			<a className={router.pathname === href ? className : ""}>{children}</a>
		</Link>
	);
};

export default withRouter(ActiveLink);
