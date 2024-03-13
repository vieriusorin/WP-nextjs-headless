import { gql } from "@apollo/client";
import client from "client";
import { BlockRenderer } from "components/BlockRenderer";
import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks";

export const dynamic = "force-dynamic";

const HOME_QUERY = gql`
	query HomePageQuery {
		nodeByUri(uri: "/") {
			... on Page {
				id
				blocks(postTemplate: false)
			}
		}
	}
`;

const getData = async () => {
	const data = await client.query({
		query: HOME_QUERY,
	});

	return data;
};

const Home = async () => {
	const { data } = await getData();

	const blocks = data.nodeByUri.blocks;
	return <BlockRenderer blocks={cleanAndTransformBlocks(blocks)} />;
};

export default Home;
