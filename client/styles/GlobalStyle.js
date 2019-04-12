import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
	*,
	html,
	body{
		margin:0;
		padding:0;
		box-sizing:border-box;
	}
	*:disabled{
		cursor:no-drop !important;
		opacity:0.5;
	}
	body{
		background : ${props => (props.bgColor ? props.bgColor : "#fff")};
		font-family: ${props => props.theme.fontOne};
		font-size:18px;
	}
	img{
		width:100%;
		height:auto;
	}
	a{
		text-decoration:none;
	}
	
	li{
		list-style:none;
	}
	label{
		display:inline-block;
		margin-bottom:5px;
	}
	input,
	button,
	textarea{
		width:100%;
		padding:10px;
	}

	/* Custom Classes */
	.help-text,
	.msg-text{
		font-size:0.8em;
		color:#a9a9a9;
	}
	.msg-text{
		width:100%;
		padding:10px;
		text-align:center;
	}
	.price {
		display: block;
		font-weight: 800;
		margin: 5px 0;
		font-size: 1.3em;
	}

	/* Stripe */

	.StripeElement {
		box-sizing: border-box;

		height: 40px;

		padding: 10px 12px;

		border: 1px solid transparent;
		border-radius: 4px;
		background-color: white;

		box-shadow: 0 1px 3px 0 #e6ebf1;
		-webkit-transition: box-shadow 150ms ease;
		transition: box-shadow 150ms ease;
	}

	.StripeElement--focus {
		box-shadow: 0 1px 3px 0 #cfd7df;
	}

	.StripeElement--invalid {
		border-color: #fa755a;
	}

	.StripeElement--webkit-autofill {
		background-color: #fefde5 !important;
	}

	/* NProgress */
	#nprogress {
 	   pointer-events: none
	}

	#nprogress .bar {
		background: #222;
		position: fixed;
		z-index: 1031;
		top: 0;
		left: 0;
		width: 100%;
		height:2px
	}

	#nprogress .peg {
		display: block;
		position: absolute;
		right: 0;
		width: 100px;
		height: 100%;
		box-shadow: 0 0 10px #F4FF77, 0 0 5px #F4FF77;
		opacity: 1;
		-webkit-transform: rotate(3deg) translate(0px, -4px);
		-ms-transform: rotate(3deg) translate(0px, -4px);
		transform: rotate(3deg) translate(0px, -4px)
	}

	#nprogress .spinner {
		display: block;
		position: fixed;
		z-index: 1031;
		top: 15px;
		right: 15px
	}

	#nprogress .spinner-icon {
		width: 18px;
		height: 18px;
		box-sizing: border-box;
		border: solid 2px transparent;
		border-top-color: #222;
		border-left-color: #222;
		border-radius: 50%;
		-webkit-animation: nprogress-spinner 400ms linear infinite;
		animation: nprogress-spinner 400ms linear infinite
	}

	.nprogress-custom-parent {
		overflow: hidden;
		position: relative
	}

	.nprogress-custom-parent #nprogress .spinner,
	.nprogress-custom-parent #nprogress .bar {
		position: absolute
	}

	@-webkit-keyframes nprogress-spinner {
		0% {
			-webkit-transform: rotate(0deg)
		}
		100% {
			-webkit-transform: rotate(360deg)
		}
	}

	@keyframes nprogress-spinner {
		0% {
			transform: rotate(0deg)
		}
		100% {
			transform: rotate(360deg)
		}
	}
`;
