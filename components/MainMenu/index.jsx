"use client";

import { ButtonLink } from "components/ButtonLink/ButtonLink";
import Link from "next/link";
import { useState } from "react";

export const MainMenu = ({ menuItems = [], callToActionButton }) => {
	const [openMenus, setOpenMenus] = useState([]);

	const toggleMenu = (id) => {
		if (openMenus.includes(id)) {
			setOpenMenus(openMenus.filter((menuId) => menuId !== id));
		} else {
			setOpenMenus([...openMenus, id]);
		}
	};

	return (
		<nav className='bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700'>
			<div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
				<a href='#' className='flex items-center space-x-3 rtl:space-x-reverse'>
					<img
						src='https://flowbite.com/docs/images/logo.svg'
						className='h-8'
						alt='Flowbite Logo'
					/>
					<span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
						Flowbite
					</span>
				</a>
				<menu className='flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
					{menuItems.map((menuItem) => (
						<li key={menuItem.id} className='relative'>
							{menuItem.subMenuItems.length > 0 ? (
								<>
									<button
										id='dropdownNavbarLink'
										data-dropdown-toggle='dropdownNavbar'
										className='flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent'
										onClick={() => toggleMenu(menuItem.id)}
									>
										{menuItem.label}
										<svg
											className='w-2.5 h-2.5 ms-2.5'
											aria-hidden='true'
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 10 6'
										>
											<path
												stroke='currentColor'
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												d='m1 1 4 4 4-4'
											/>
										</svg>
									</button>
									{openMenus.includes(menuItem.id) && (
										<div
											className='absolute top-8 w-[160px] z-[1001] bg-white/[0.9]'
											id={`dropdownNavbar-${menuItem.id}`}
										>
											<ul
												className='py-2 text-sm text-gray-700 dark:text-gray-400'
												aria-labelledby='dropdownLargeButton'
											>
												{menuItem.subMenuItems.map((subMenuItem) => (
													<li key={subMenuItem.id}>
														<Link
															href={subMenuItem.destination}
															className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
														>
															{subMenuItem.label}
														</Link>
													</li>
												))}
											</ul>
										</div>
									)}
								</>
							) : (
								<Link
									href={menuItem.destination}
									className='block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-white-700 md:p-0 md:dark:text-white-500 dark:bg-blue-600 md:dark:bg-transparent'
								>
									{menuItem.label}
								</Link>
							)}
						</li>
					))}
				</menu>

				<ButtonLink
					destination={callToActionButton.destination.uri}
					label={callToActionButton.label.toUpperCase()}
				/>
			</div>
		</nav>
	);
};
