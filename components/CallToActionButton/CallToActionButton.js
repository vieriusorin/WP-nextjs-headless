import { ButtonLink } from "components/ButtonLink/ButtonLink";

export const CallToActionButton = ({ data }) => {
	const { uri, label, align } = data;
	return (
		<div className={`text-${align}`}>
			<ButtonLink destination={uri} label={label} />
		</div>
	);
};
