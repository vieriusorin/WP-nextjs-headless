import { CallToActionButton } from "components/CallToActionButton";
import { Column } from "components/Column";
import { Columns } from "components/Columns";
import { Cover } from "components/Cover";
import { FormspreeForm } from "components/FormspreeForm";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import { PropertyFeatures } from "components/PropertyFeatures";
import { PropertySearch } from "components/PropertySearch";
import Image from "next/image";

import { theme } from "theme";

export const BlockRenderer = ({ blocks }) => {
	return blocks.map((block) => {
		switch (block.name) {
			case "core/heading":
			case "core/post-title":
				return (
					<Heading
						key={block.id}
						level={block.attributes.level}
						content={block.attributes.content}
						textAlign={
							theme[block.attributes.textAlign] || block.attributes.textAlign
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
			case "core/columns":
				return (
					<Columns
						key={block.id}
						isStackedOnMobile={block.attributes.isStackedOnMobile}
					>
						<BlockRenderer blocks={block.innerBlocks} />
					</Columns>
				);
			case "core/column":
				return (
					<Column key={block.id}>
						<BlockRenderer blocks={block.innerBlocks} />
					</Column>
				);
			case "core/image":
				return (
					<Image
						width={block.attributes.width}
						height={block.attributes.height}
						key={block.id}
						src={block.attributes.url}
						alt={block.attributes.alt || ""}
					/>
				);
			case "core/group":
				return <BlockRenderer key={block.id} blocks={block.innerBlocks} />;
			case "core/block":
				return <BlockRenderer key={block.id} blocks={block.innerBlocks} />;
			case "wd/ctabutton":
				return (
					<CallToActionButton key={block.id} data={block.attributes.data} />
				);
			case "wd/propertysearch":
				return <PropertySearch key={block.id} data={block.attributes.data} />;
			case "wd/propertyfeatures":
				return <PropertyFeatures key={block.id} data={block} />;
			case "wd/formspreeform":
				return <FormspreeForm key={block.id} data={block.attributes.data} />;
			default:
				return null;
		}
	});
};
