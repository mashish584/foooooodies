import { useState } from "react";
import { serverEndpoint, serverLiveEndpoint } from "../data/config";
import { Router } from "../routes";

const useGuard = (authGuard = true) => {
	const [authState, setAuthState] = useState(true);

	async function isAuth() {
		const host =
			process.env.NODE_ENV !== "production" ? serverEndpoint : serverLiveEndpoint;
		const response = await fetch(`${host}/me`, {
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
