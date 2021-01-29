import styled from "@emotion/styled";
import * as React from "react";
import { useEffect, useState } from "react";

export const App = () => {
	const [popupOpen, setPopupOpen] = useState(false);

	return (
		<Page>
			<Button onClick={() => setPopupOpen(true)}>Notez l'application !</Button>
			{popupOpen && (
				<Backdrop onClick={() => setPopupOpen(false)}>
					<RatingPopup onClick={e => e.stopPropagation()}></RatingPopup>
				</Backdrop>
			)}
		</Page>
	);
};

const RatingPopup: React.FC<{ onClick?: (event: React.MouseEvent) => void }> = props => {
	const [showRating, setShowRating] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [rating, setRating] = useState(0);

	useEffect(() => {
		const timeout = setTimeout(() => setShowRating(true), 1000);
		return () => clearTimeout(timeout);
	});

	return (
		<Popup onClick={props.onClick}>
			<Title>Notez l'application !</Title>
			{showSuccess ? (
				<SuccessMessage>Merci d'avoir donné votre avis !</SuccessMessage>
			) : showRating ? (
				<>
					<div style={{ alignSelf: "center" }}>
						<Stars>
							<Star onClick={() => setRating(1)} active={rating >= 1}></Star>
							<Star onClick={() => setRating(2)} active={rating >= 2}></Star>
							<Star onClick={() => setRating(3)} active={rating >= 3}></Star>
							<Star onClick={() => setRating(4)} active={rating >= 4}></Star>
							<Star onClick={() => setRating(5)} active={rating >= 5}></Star>
						</Stars>
					</div>
					<Button onClick={() => setShowSuccess(true)}>Valider</Button>
				</>
			) : (
				<Incentive>Donnez nous votre avis sur l'application !</Incentive>
			)}
		</Popup>
	);
};

const Star = React.forwardRef<SVGSVGElement, React.SVGAttributes<SVGSVGElement> & { active: boolean }>((props, ref) => {
	return (
		<svg
			ref={ref}
			style={{ cursor: "pointer" }}
			xmlns="http://www.w3.org/2000/svg"
			width="48"
			height="48"
			viewBox="0 0 24 24"
			{...props}
		>
			<path
				stroke="#FF9E3F"
				fill={props.active ? "#FF9E3F" : "none"}
				d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"
			/>
		</svg>
	);
});

const Page = styled.div`
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Button = styled.button`
	appearance: none;
	background: linear-gradient(to right, #0080ff, #24a0ff);
	padding: 10px 20px;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	outline: 0;
`;

const Backdrop = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.2);
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Popup = styled.div`
	padding: 40px;
	background: white;
	border-radius: 15px;
	width: 400px;
	display: flex;
	flex-direction: column;
`;
const Title = styled.h1`
	margin: 0;
	margin-bottom: 40px;
`;

const Stars = styled.div`
	display: flex;
	align-self: center;
	margin-bottom: 40px;

	> *:not(:last-child) {
		margin-right: 10px;
	}
`;
const Incentive = styled.div`
	color: #666;
	font-size: 15px;
	text-align: center;
`;
const SuccessMessage = styled.div`
	color: #028644;
	font-weight: bold;
	font-size: 15px;
	text-align: center;
`;
