import client from "client";
import { gql } from "@apollo/client";

// GET api/search
export const GET = async (req, res) => {
	const url = new URL(req.url);
	const hasParking = url.searchParams.get("hasParking") || false;
	const petFriendly = url.searchParams.get("petFriendly") || false;

	const isParkingAvailable = hasParking ? "1" : "0";
	const isPetFriendly = petFriendly ? "1" : "0";

	let parkingFilter = "";
	let petFriendlyFilter = "";
	let minPriceFilter = "";
	let maxPriceFilter = "";

	const filters = {
		page: url.searchParams.get("page") || 1,
		perPage: url.searchParams.get("perPage") || 2,
		hasParking: isParkingAvailable,
		petFriendly: isPetFriendly,
		minPrice: url.searchParams.get("minPrice") || "0",
		maxPrice: url.searchParams.get("maxPrice") || "0",
	};

	if (filters.hasParking !== "0") {
		parkingFilter = `{
			key: "property_features_has_parking"
			compare: EQUAL_TO
			value: "1"
		}`;
	}

	if (filters.petFriendly !== "0") {
		petFriendlyFilter = `{
      key: "property_features_pet_friendly"
      compare: EQUAL_TO
      value: "1"
    }`;
	}

	if (filters.minPrice !== "0") {
		minPriceFilter = `{
			key: "property_features_price"
      compare: GREATER_THAN_OR_EQUAL_TO
      value: ${filters.minPrice}
      type: NUMERIC
		}`;
	}

	if (filters.maxPrice !== "0") {
		maxPriceFilter = `{
			key: "property_features_price"
      compare: LESS_THAN_OR_EQUAL_TO
      value: ${filters.maxPrice}
      type: NUMERIC
		}`;
	}

	try {
		const { data } = await client.query({
			query: gql`
				query AllPropertiesQuery(
					$perPage: Int!
					$page: Int!
				) {
					properties(
						where: {
							offsetPagination: { offset: $page, size: $perPage }
							metaQuery: {
								relation: AND
								metaArray: [
									${parkingFilter}
									${petFriendlyFilter}
									${minPriceFilter}
									${maxPriceFilter}
								]
							}
						}
					) {
						nodes {
							databaseId
							title
							uri
							featuredImage {
								node {
									altText
									uri
								}
							}
							property_features {
								propertyFeatures {
									bathrooms
									bedrooms
									hasParking
									petFriendly
									price
								}
							}
						}
						pageInfo {
							offsetPagination {
								total
								hasPrevious
								hasMore
							}
						}
					}
				}
			`,
			variables: {
				page: Number(filters.page) || 0,
				perPage: Number(filters.perPage) || 2,
			},
		});
		return new Response(
			JSON.stringify({
				data: {
					properties: data.properties.nodes,
					total: data.properties.pageInfo.offsetPagination.total,
				},
				status: "success",
			}),
			{
				status: 200,
			}
		);
	} catch (error) {
		return new Response(error.message, {
			status: 500,
		});
	}
};
