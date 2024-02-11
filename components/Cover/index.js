import Image from "next/image";
export const Cover = ({ children, background }) => {
	return (
		<div className='h-screen relative text-white bg-slate-800 min-h-[400px] flex justify-center items-center'>
			<Image
				alt='Cover'
				fill='fill'
				src={background}
				objectFit='cover'
				className='minx-blend-soft-light'
			/>
			<div className='max-w-5xl z-10'>{children}</div>
		</div>
	);
};
