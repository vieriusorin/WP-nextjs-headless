import React from "react";

export const Input = ({ ...rest }) => {
	return (
		<input
			{...rest}
			className='block rounded-md border-slate-400 border-2 hover:border-slate-600'
		/>
	);
};
