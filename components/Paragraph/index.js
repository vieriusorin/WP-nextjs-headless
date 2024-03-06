import { getTextAlign } from "utils/fonts";
import { relativeToAbsoluteUrls } from "utils/relativeToAbsoluteUrls";
export const Paragraph = ({ textColor, content, textAlign = "left" }) => {
	return (
		<p
			className={`amx-w-5xl mx-auto ${getTextAlign(textAlign)}`}
			style={{ color: textColor }}
			dangerouslySetInnerHTML={{ __html: relativeToAbsoluteUrls(content) }}
		/>
	);
};
