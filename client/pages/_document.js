import Document, { Head, Main, NextScript } from 'next/document';
// Import styled components ServerStyleSheet
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
	static getInitialProps({ renderPage }) {
		// TODO: Create an instance of ServerStyleSheet
		const sheet = new ServerStyleSheet();

		// TODO: Retrieve styles from components in the page
		const page = renderPage((App) => (props) => sheet.collectStyles(<App {...props} />));

		// TODO: Extract the styles as <style> tags
		const styleTags = sheet.getStyleElement();

		// TODO: Pass styleTags as a prop
		return { ...page, styleTags };
	}

	render() {
		return (
			<html>
				<Head>{this.props.styleTags}</Head>
				<body>
					<Main />
					// <script src="https://js.stripe.com/v3/" />
					<NextScript />
				</body>
			</html>
		);
	}
}
