import { Input } from "components/Input";
import { useEffect, useState } from "react";

export const Filters = ({ onSearch }) => {
	const [petFriendly, setPetFriendly] = useState(false);
	const [hasParking, setHasParking] = useState(false);
	const [minPrice, setMinPrice] = useState("");
	const [maxPrice, setMaxPrice] = useState("");

	const handleSearch = () => {
		onSearch(petFriendly, hasParking, minPrice, maxPrice);
	};

	return (
		<div className='max-w-5xl rounded-md bg-gray-200 mx-auto my-5 p-10 flex gap-5 border-2 border-gray-600 border-solid items-center'>
			<div className='flex-1'>
				<div className='mb-3'>
					<label className='flex items-center text-gray-700 text-sm font-bold cursor pointer'>
						<input
							type='checkbox'
							className='mr-1'
							checked={hasParking}
							onChange={() => setHasParking((hasParking) => !hasParking)}
						/>
						<span className=''>has parking</span>
					</label>
				</div>

				<div>
					<label className='flex items-center text-gray-700 text-sm font-bold  cursor pointer'>
						<input
							type='checkbox'
							className='mr-1'
							checked={petFriendly}
							onChange={() => setPetFriendly((petFriendly) => !petFriendly)}
						/>
						<span className=''>pet friendly</span>
					</label>
				</div>
			</div>
			<div className='flex-1'>
				<span className='block mb-2'>Min price</span>
				<Input
					type='number'
					className='w-full h-10 border border-gray-700'
					value={minPrice}
					onChange={(e) => setMinPrice(e.target.value)}
				/>
			</div>
			<div className='flex-1'>
				<span className='block mb-2'>Max price</span>
				<Input
					type='number'
					className='w-full h-10 border border-gray-700'
					value={maxPrice}
					onChange={(e) => setMaxPrice(e.target.value)}
				/>
			</div>
			<div className='mt-auto'>
				<button className='btn m-0' onClick={handleSearch}>
					Search
				</button>
			</div>
		</div>
	);
};
