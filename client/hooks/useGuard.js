import { useState } from "react";
import { Router } from "../routes";

const useGuard = (authGuard = true) => {
	const [authState, setAuthState] = useState(true);

	async function isAuth() {
		const response = await fetch("http://localhost:4040/me", {
			credentials: "include"
		});
		const { currentUser } = await response.json();
		if (authGuard) {
			currentUser ? Router.pushRoute("/") : setAuthState(false);
		} else {
			!currentUser ? Router.pushRoute("/signin") : setAuthState(false);
		}
	}

	return [authState, isAuth];
};

export default useGuard;
