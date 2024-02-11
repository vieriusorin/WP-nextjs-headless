import { gql } from "@apollo/client";
import client from "client";
import { BlockRenderer } from "components";
import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks";

export const dynamic = "force-dynamic";

const getData = async () => {
	const data = await client.query({
		query: gql`
			query NewQuery {
				nodeByUri(uri: "/") {
					... on Page {
						id
						blocks(postTemplate: false)
					}
				}
			}
		`,
	});

	return data;
};

const Home = async (props) => {
	const { data } = await getData();

	const blocks = data.nodeByUri.blocks;

	return (
		<div>
			<BlockRenderer blocks={cleanAndTransformBlocks(blocks)} />
		</div>
	);
};

export default Home;
