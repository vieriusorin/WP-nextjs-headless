import { PropertyCard } from "../PropertyCard";

export const Results = ({ properties }) => {
	return (
		<div className='max-w-5xl mx-auto grid md: grid-cols-3 gap-5 mb-10 py-12'>
			{properties.map((property) => {
				return <PropertyCard property={property} />;
			})}
		</div>
	);
};
