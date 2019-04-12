import { useState } from "react";
import _ from "lodash";

const useForm = formData => {
	const [formElements, setFormElements] = useState(formData);
	const [validForm, setFormValid] = useState(false);

	// TODO : Validate all types of input element against defined rules
	const validateInput = (value, rules, fieldName) => {
		let isValid = true,
			message = "";

		if (!rules) return isValid;

		if (rules.isRequired) {
			isValid = value.trim() !== "" && isValid;
			message = !isValid ? `Enter ${fieldName}  please` : "";
		}

		if (isValid && rules.isNumber) {
			isValid = !isNaN(value);
			message = !isValid ? `Enter valid price value` : "";
		}

		return { isValid, message };
	};

	// TODO : Validate the upload document
	const validateUpload = (files, rules) => {
		let isValid = true,
			message = "";

		if (!rules) return isValid;

		if (rules.isRequired) {
			isValid = files.length > 0;
			message = !isValid ? "Please upload file" : "";
		}

		if (isValid && rules.isImage) {
			console.log(files[0]);
			isValid = files[0].type.includes("image");
			message = !isValid ? "Invalid image uplaod" : "";
		}

		return { isValid, message };
	};

	// TODO : Update active element properties
	const setElementValue = (element, valid, message, value) => {
		element.valid = valid;
		element.message = message;
		element.touched = true;
		element.value = value;
	};

	// TODO : Validate complete form
	const validateForm = elements => {
		let formValid = true;
		for (let key in elements) {
			formValid = elements[key].valid && formValid;
		}
		return formValid;
	};

	// TODO : Handle Upload
	const updateUploadValue = ({ target }) => {
		const { name, files } = target;

		const elements = _.cloneDeep(formElements);
		const { isValid, message } = validateUpload(files, elements[name].validation);

		// update value of active element
		setElementValue(elements[name], isValid, message, files.length ? files[0] : null);

		// validate form
		setFormValid(validateForm(elements));

		// update formElements state
		setFormElements(elements);
	};

	// TODO: Handle Input
	const updateInputValue = ({ target }) => {
		const { name, value } = target;

		const elements = _.cloneDeep(formElements);
		const { isValid, message } = validateInput(value, elements[name].validation, name);

		// update values of active element
		setElementValue(elements[name], isValid, message, value);

		// Validate Form
		setFormValid(validateForm(elements));

		// update formElements state
		setFormElements(elements);
	};

	//TODO: Reset form values
	const resetForm = () => {
		const elements = _.cloneDeep(formElements);
		for (let key in elements) {
			elements[key].value = "";
		}
		setFormElements(elements);
	};

	//TODO : return hook internal state and methods for external components
	return {
		formElements,
		validForm,
		resetForm,
		updateInputValue,
		updateUploadValue,
		resetForm
	};
};

export default useForm;
