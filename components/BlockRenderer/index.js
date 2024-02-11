import { Cover } from "components/Cover";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import { theme } from "theme";

export const BlockRenderer = async ({ blocks }) => {
	return blocks.map((block) => {
		switch (block.name) {
			case "core/heading":
				return (
					<Heading
						key={block.id}
						level={block.attributes.level}
						content={block.attributes.content}
						textAlign={
							theme[block.attributes.textColor] ||
							block.attributes.style?.color?.text
						}
					/>
				);
			case "core/paragraph":
				return (
					<Paragraph
						key={block.id}
						content={block.attributes.content}
						textAlign={block.attributes.textAlign}
						style={block.attributes.style}
						textColor={block.attributes.textColor}
					/>
				);
			case "core/cover":
				return (
					<Cover key={block.id} cover={block} background={block.attributes.url}>
						<BlockRenderer blocks={block.innerBlocks} />
					</Cover>
				);
			default:
				return null;
		}
	});
};
