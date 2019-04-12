import { Link } from "../../routes";
import { LogoStyle } from "../../styles/_index";

const Logo = ({ src, title }) => (
	<Link route="/">
		<LogoStyle>
			<img src={src} alt={title} />
		</LogoStyle>
	</Link>
);

export default Logo;
