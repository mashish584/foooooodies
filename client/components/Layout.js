import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import { StripeProvider } from "react-stripe-elements";
import { GlobalStyle, ContainerStyle } from "../styles/_index";
import Meta from "./Meta";
import Header from "./Header/Header";

const theme = {
	foodies: "#F4FF77",
	fontOne: "'Roboto', sans-serif",
	fontTwo: "'Lato', sans-serif",
	black: "#222",
	success: "#38ef7d",
	danger: "#ff0000"
};

class Layout extends Component {
	state = { stripe: null };

	componentDidMount() {
		this.setState({ stripe: window.Stripe("pk_test_MD5eLZeYzbbBUSKZ1NX1QLyu") });
	}

	render() {
		return (
			<ThemeProvider theme={theme}>
				<StripeProvider stripe={this.state.stripe}>
					<>
						<GlobalStyle />
						<Meta />
						<Header />
						<ContainerStyle>{this.props.children}</ContainerStyle>
					</>
				</StripeProvider>
			</ThemeProvider>
		);
	}
}

export default Layout;
