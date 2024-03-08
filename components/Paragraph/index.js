import { getTextAlign } from "utils/fonts";
import { relativeToAbsoluteUrls } from "utils/relativeToAbsoluteUrls";
export const Paragraph = ({
	textColor,
	content,
	textAlign = "left",
	style,
}) => {
	return (
		<p
			className={`amx-w-5xl mx-auto ${getTextAlign(textAlign)}`}
			style={{ color: style?.color?.text || textColor }}
			dangerouslySetInnerHTML={{ __html: relativeToAbsoluteUrls(content) }}
		/>
	);
};
