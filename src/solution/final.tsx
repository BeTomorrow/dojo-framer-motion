import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import { useEffect, useState } from "react";

export const App = () => {
	const [popupOpen, setPopupOpen] = useState(false);

	const backdropAnimation = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };

	return (
		<Page>
			<Button onClick={() => setPopupOpen(true)}>Notez l'application !</Button>
			<AnimatePresence>
				{popupOpen && (
					<Backdrop onClick={() => setPopupOpen(false)} {...backdropAnimation}>
						<RatingPopup onClick={e => e.stopPropagation()}></RatingPopup>
					</Backdrop>
				)}
			</AnimatePresence>
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

	const popupAnimation = {
		initial: { y: -30, opacity: 0 },
		animate: { y: 0, opacity: 1 },
		exit: { y: 30, opacity: 0 },
		transition: { y: { type: "spring", stiffness: 300, damping: 30 } },
	};
	const childAnimation = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		transition: { delay: 0.3 },
	};
	const starsAnimation = {
		initial: "hidden",
		animate: rating > 0 ? "rated" : "shown",
		transition: { staggerChildren: 0.05 },
	};
	const starAnimation = {
		variants: {
			hidden: { scale: 0.8 },
			shown: { scale: 0.8 },
			rated: { scale: 1.1 },
		},
	};

	return (
		<Popup onClick={props.onClick} {...popupAnimation} layout>
			<Title layout>Notez l'application !</Title>
			{showSuccess ? (
				<SuccessMessage {...childAnimation}>Merci d'avoir donné votre avis !</SuccessMessage>
			) : showRating ? (
				<>
					<motion.div {...childAnimation} style={{ alignSelf: "center" }}>
						<Stars {...starsAnimation}>
							<AnimatedStart onClick={() => setRating(1)} active={rating >= 1} {...starAnimation}></AnimatedStart>
							<AnimatedStart onClick={() => setRating(2)} active={rating >= 2} {...starAnimation}></AnimatedStart>
							<AnimatedStart onClick={() => setRating(3)} active={rating >= 3} {...starAnimation}></AnimatedStart>
							<AnimatedStart onClick={() => setRating(4)} active={rating >= 4} {...starAnimation}></AnimatedStart>
							<AnimatedStart onClick={() => setRating(5)} active={rating >= 5} {...starAnimation}></AnimatedStart>
						</Stars>
					</motion.div>
					<Button onClick={() => setShowSuccess(true)} {...childAnimation}>
						Valider
					</Button>
				</>
			) : (
				<Incentive {...childAnimation}>Donnez nous votre avis sur l'application !</Incentive>
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
const AnimatedStart = motion.custom(Star);

const Page = styled.div`
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Button = styled(motion.button)`
	appearance: none;
	background: linear-gradient(to right, #0080ff, #24a0ff);
	padding: 10px 20px;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	outline: 0;
`;

const Backdrop = styled(motion.div)`
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

const Popup = styled(motion.div)`
	padding: 40px;
	background: white;
	border-radius: 15px;
	width: 400px;
	display: flex;
	flex-direction: column;
`;
const Title = styled(motion.h1)`
	margin: 0;
	margin-bottom: 40px;
`;

const Stars = styled(motion.div)`
	display: flex;
	align-self: center;
	margin-bottom: 40px;

	> *:not(:last-child) {
		margin-right: 10px;
	}
`;
const Incentive = styled(motion.div)`
	color: #666;
	font-size: 15px;
	text-align: center;
`;
const SuccessMessage = styled(motion.div)`
	color: #028644;
	font-weight: bold;
	font-size: 15px;
	text-align: center;
`;
