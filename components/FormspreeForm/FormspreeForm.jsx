"use client";
import { useForm, ValidationError } from "@formspree/react";
import { Input } from "components/Input";

export const FormspreeForm = ({ data }) => {
	const { form_id: id } = data;

	const [state, handleSubmit] = useForm(id);
	if (state.succeeded) {
		return <p>Thanks for joining!</p>;
	}

	return (
		<form onSubmit={handleSubmit} className='max-w-5xl mx-auto my-12'>
			<label htmlFor='email'>Email Address</label>
			<Input id='email' type='email' name='email' />
			<ValidationError prefix='Email' field='email' errors={state.errors} />
			<textarea
				className='border-2 p-1 mt-2 block  rounded-md border-slate-400 hover:border-slate-'
				id='message'
				name='message'
			/>
			<ValidationError prefix='Message' field='message' errors={state.errors} />
			<div>
				<button type='submit' className='btn' disabled={state.submitting}>
					Submit
				</button>
			</div>
		</form>
	);
};
