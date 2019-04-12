import { useEffect } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Head from "next/head";
import { Link } from "../routes";
import useForm from "../hooks/useForm";
import useGuard from "../hooks/useGuard";
import { Router } from "../routes";
import { SignInData, SignUpData } from "../data/form-structure";
import { firstUC, getFormValues } from "../util";
import { FormStyle, InputErrorStyle, ButtonSubmitStyle } from "../styles/_index";
import Input from "./Util/Input";
import Alert from "./Util/Alert";

import { CURRENT_USER_QUERY } from "./Util/CheckAuth";

const SIGNUP_MUTATION = gql`
	mutation SIGNUP_MUTATION($fullname: String!, $email: String!, $password: String!) {
		createUser(fullname: $fullname, email: $email, password: $password) {
			id
		}
	}
`;

const SIGNIN_MUTATION = gql`
	mutation signin($email: String!, $password: String!) {
		authUser(email: $email, password: $password) {
			token
			message
		}
	}
`;

const AuthForm = ({ signin }) => {
	const { formElements, updateInputValue, validForm, resetForm } = useForm(
		signin ? SignInData : SignUpData
	);

	const [authState, checkAuth] = useGuard();

	useEffect(() => {
		checkAuth();
	}, []);

	return (
		!authState && (
			<Mutation
				mutation={signin ? SIGNIN_MUTATION : SIGNUP_MUTATION}
				variables={getFormValues(formElements)}
				refetchQueries={signin ? [{ query: CURRENT_USER_QUERY }] : []}
			>
				{(auth, { data, error, loading }) => {
					return (
						<>
							{error && <Alert danger="true" error={error} />}
							{data && !signin && <Alert error={{}}>Signup Done..</Alert>}
							<Head>
								<title>Foodies | {signin ? "Sign In" : "Sign Up"}</title>
							</Head>
							<FormStyle
								onSubmit={async e => {
									e.preventDefault();
									await auth();
									resetForm();
									// Redirect to home if user signin
									if (signin) {
										Router.pushRoute("/");
									}
								}}
								width="375px"
							>
								{Object.keys(formElements).map(
									(key, i) =>
										key !== "disabled" && (
											<div key={i} className="input-group">
												<label htmlFor={key}>{firstUC(key)}</label>
												<Input
													name={key}
													updateValue={updateInputValue}
													value={formElements[key].value}
													valid={formElements[key].valid}
													touched={formElements[key].touched}
													{...formElements[key].config}
													{...formElements[key].validation}
												/>
												{formElements[key].message && (
													<InputErrorStyle>
														{formElements[key].message}
													</InputErrorStyle>
												)}
											</div>
										)
								)}
								<ButtonSubmitStyle disabled={!validForm || loading}>
									{signin ? "SignIn" : "SignUp"}
								</ButtonSubmitStyle>
								<br />
								<br />
								<span>
									{signin ? "Don't " : "Already "} have an account.{" "}
									<Link href={signin ? "/signup" : "/signin"}>
										<a>{signin ? "Signup" : "Signin"}</a>
									</Link>
								</span>
							</FormStyle>
						</>
					);
				}}
			</Mutation>
		)
	);
};

export default AuthForm;
