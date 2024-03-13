import Image from "next/image";
import Link from "next/link";
import numeral from "numeral";
import React from "react";

export const PropertyCard = ({ property }) => {
	const { title, uri } = property;

	const imageURI = property.featuredImage.node.uri;
	const imageAlt = property.featuredImage.node.altText;

	const { bathrooms, bedrooms, price, petFriendly, hasParking } =
		property.property_features.propertyFeatures;

	return (
		<div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow'>
			<Link href='#'>
				<Image
					width='330'
					height='200'
					loading='lazy'
					className='rounded-t-lg'
					src={`${process.env.NEXT_PUBLIC_WP_URL}${imageURI}`}
					alt={imageAlt}
				/>
			</Link>
			<div className='p-5'>
				<Link href={uri}>
					<h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>
						{title}
					</h5>
				</Link>

				<ul className='space-y-4 text-left mb-5 text-gray-500 dark:text-gray-400'>
					<li className='flex items-center space-x-3 rtl:space-x-reverse'>
						<span>Price: {numeral(price).format("($0,0)")}</span>
					</li>
					<li className='flex items-center space-x-3 rtl:space-x-reverse'>
						<span>Bedrooms: {bedrooms}</span>
					</li>
					<li className='flex items-center space-x-3 rtl:space-x-reverse'>
						<span>Bathrooms: {bathrooms}</span>
					</li>
					<li className='flex items-center space-x-3 rtl:space-x-reverse'>
						<span>Pet friendly: {petFriendly ? "Yes" : "No"}</span>
					</li>

					<li className='flex items-center space-x-3 rtl:space-x-reverse'>
						<span>Parking: {hasParking ? "Yes" : "No"}</span>
					</li>
				</ul>

				<Link
					href={uri}
					className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
				>
					Read more
				</Link>
			</div>
		</div>
	);
};
