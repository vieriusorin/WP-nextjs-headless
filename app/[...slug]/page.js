import client from "client";
import { gql } from "@apollo/client";
import { BlockRenderer } from "components/BlockRenderer";
import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const PAGE_QUERY = gql`
	query PageQuery($uri: String!) {
		nodeByUri(uri: $uri) {
			... on Page {
				id
				title
				blocks(postTemplate: false)
			}
			... on Property {
				id
				title
				blocks(postTemplate: false)
			}
		}
	}
`;

const getData = async (context) => {
	const uri = context.params?.slug ? `${context.params.slug.join("/")}/` : "/";

	const data = await client.query({
		query: PAGE_QUERY,
		variables: {
			uri,
		},
	});

	return data;
};

const Slug = async (props) => {
	const { data } = await getData(props);

	if (data.nodeByUri === null) {
		redirect("/404");
	}

	const blocks = data.nodeByUri.blocks;

	return <BlockRenderer blocks={cleanAndTransformBlocks(blocks)} />;
};

export default Slug;
