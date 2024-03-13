"use client";

import { useState, useEffect } from "react";
import { Results } from "./Results";
import { PaginationCustom } from "components/CustomPagination";
import { Filters } from "./Filters";

export const PropertySearch = () => {
	const [propertiesFiltered, setPropertiesFiltered] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [totalItems, setTotalItems] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(2);

	const queryString = new URLSearchParams();

	const fetchProperties = async (
		page,
		perPage,
		petFriendly,
		hasParking,
		minPrice,
		maxPrice
	) => {
		const response = await fetch(
			`http://localhost:3000/api/search?page=${page}${
				perPage ? "&perPage=" + perPage : ""
			}${petFriendly ? "&petFriendly=" + petFriendly : ""}${
				hasParking ? "&hasParking=" + hasParking : ""
			}${minPrice ? "&minPrice=" + minPrice : ""}${
				maxPrice ? "&maxPrice=" + maxPrice : ""
			}`
		);
		const data = await response.json();
		return data;
	};

	useEffect(() => {
		if (currentPage) {
			queryString.append("page", String(currentPage));
		}

		if (itemsPerPage) {
			queryString.append("perPage", String(itemsPerPage));
		}
	}, [currentPage, itemsPerPage]);

	useEffect(() => {
		fetchProperties(currentPage, itemsPerPage).then((data) => {
			setPropertiesFiltered(data?.data?.properties);
			setTotalItems(data?.data?.total);
		});
	}, [currentPage, itemsPerPage]);

	const handleSearch = async (petFriendly, hasParking, minPrice, maxPrice) => {
		fetchProperties(
			currentPage,
			itemsPerPage,
			petFriendly,
			hasParking,
			minPrice,
			maxPrice
		).then((data) => {
			setPropertiesFiltered(data?.data?.properties);
			setTotalItems(data?.data?.total);
		});
	};

	return (
		<>
			<Filters onSearch={handleSearch} />
			{propertiesFiltered.length > 0 ? (
				<Results properties={propertiesFiltered} />
			) : (
				<h1>No properties</h1>
			)}
			{totalItems > 0 && (
				<PaginationCustom
					totalItems={totalItems}
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			)}
		</>
	);
};
