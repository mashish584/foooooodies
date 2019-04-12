import { InputStyle, TextAreaStyle } from "../../styles/_index";

const Input = props => {
	const { elType, name, value, updateValue, touched, valid } = props;
	let inputElement = null;
	let inputClasses = [];

	if (touched && !valid) {
		inputClasses.push("error");
	}

	switch (elType) {
		case "text":
			inputElement = (
				<InputStyle
					type={elType}
					name={name}
					className={inputClasses.join("")}
					onChange={e => updateValue(e)}
					value={value}
				/>
			);
			break;
		case "number":
			inputElement = (
				<InputStyle
					type={elType}
					name={name}
					className={inputClasses.join("")}
					onChange={e => updateValue(e)}
					value={value}
				/>
			);
			break;
		case "email":
			inputElement = (
				<InputStyle
					type={elType}
					name={name}
					className={inputClasses.join("")}
					onChange={e => updateValue(e)}
					value={value}
				/>
			);
			break;
		case "password":
			inputElement = (
				<InputStyle
					type={elType}
					name={name}
					className={inputClasses.join("")}
					onChange={e => updateValue(e)}
					value={value}
					autoComplete="off"
				/>
			);
			break;
		case "textarea":
			inputElement = (
				<TextAreaStyle
					name={name}
					className={inputClasses.join("")}
					onChange={e => updateValue(e)}
					value={value}
				/>
			);
			break;
		case "file":
			inputElement = (
				<InputStyle type="file" name={name} onChange={e => updateValue(e)} />
			);
			break;
		default:
			inputElement = null;
	}

	return inputElement;
};

export default Input;
