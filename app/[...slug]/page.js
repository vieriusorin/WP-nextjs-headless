import client from "client";
import { gql } from "@apollo/client";
import { BlockRenderer } from "components";
import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks";

export const dynamic = "force-dynamic";

const PAGE_QUERY = gql`
	query PageQuery($uri: String!) {
		nodeByUri(uri: $uri) {
			... on Page {
				id
				title
				blocks(postTemplate: false)
			}
		}
	}
`;

const getData = async (context) => {
	const uri = `${context.params.slug.join("/")}/`;

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
	const blocks = data.nodeByUri.blocks;

	console.log(blocks);

	return (
		<div>
			<BlockRenderer blocks={cleanAndTransformBlocks(blocks)} />
		</div>
	);
};

export default Slug;
