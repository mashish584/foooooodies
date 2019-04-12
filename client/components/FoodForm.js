import { useEffect } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Head from "next/head";
import { Router } from "../routes";
import useForm from "../hooks/useForm";
import useGuard from "../hooks/useGuard";
import { firstUC, getFormValues } from "../util";
import { AddFoodData } from "../data/form-structure";
import {
	FormStyle,
	InputErrorStyle,
	ButtonSubmitStyle,
	TagListStyle
} from "../styles/_index";
import Input from "./Util/Input";
import Alert from "./Util/Alert";

export const ADD_FOOD_MUTATION = gql`
	mutation ADD_FOOD_MUTATION(
		$name: String!
		$price: Int!
		$description: String!
		$tags: String!
		$upload: Upload!
	) {
		addFood(
			name: $name
			price: $price
			description: $description
			tags: $tags
			upload: $upload
		) {
			id
		}
	}
`;

const FoodForm = () => {
	const {
		formElements,
		updateInputValue,
		updateUploadValue,
		validForm,
		resetForm
	} = useForm(AddFoodData);

	const [authState, checkAuth] = useGuard(false);

	useEffect(() => {
		checkAuth();
	}, []);

	return (
		!authState && (
			<Mutation
				mutation={ADD_FOOD_MUTATION}
				variables={getFormValues(formElements)}
			>
				{(addFood, { error, loading }) => (
					<>
						<Head>
							<title>Foodies | Add Food</title>
						</Head>
						<FormStyle
							onSubmit={async e => {
								e.preventDefault();
								const response = await addFood();
								resetForm();
								Router.pushRoute(`/food/${response.data.addFood.id}`);
							}}
							width="375px"
						>
							{error && <Alert danger={true} error={error} />}
							{Object.keys(formElements).map((key, i) => (
								<div key={i} className="input-group">
									<label htmlFor={key}>{firstUC(key)}</label>
									<Input
										name={key}
										updateValue={
											key !== "upload"
												? updateInputValue
												: updateUploadValue
										}
										value={formElements[key].value}
										valid={formElements[key].valid}
										touched={formElements[key].touched}
										{...formElements[key].config}
										{...formElements[key].validation}
									/>
									{formElements[key].helpText && (
										<span className="help-text">
											{formElements[key].helpText}
										</span>
									)}
									{key === "tags" && (
										<TagListStyle>
											{formElements[key].value.includes(",") &&
												formElements[key].value
													.split(",")
													.map((tag, i) =>
														tag.trim() !== "" ? (
															<li key={i}>{tag}</li>
														) : null
													)}
										</TagListStyle>
									)}

									{formElements[key].message && (
										<InputErrorStyle>
											{formElements[key].message}
										</InputErrorStyle>
									)}
								</div>
							))}
							<ButtonSubmitStyle disabled={!validForm || loading}>
								ADD FOOD
							</ButtonSubmitStyle>
						</FormStyle>
					</>
				)}
			</Mutation>
		)
	);
};

export default FoodForm;
