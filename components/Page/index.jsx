import { MainMenu } from "components/MainMenu";
import Head from "next/head";
import React from "react";

export const Page = (props) => {
	return (
		<>
			<Head>
				<title>{props.seo.title}</title>
				<meta name='description' content={props.seo.metaDesc} />
			</Head>
			<MainMenu
				menuItems={props.mainMenuItems}
				callToActionButton={props.callToActionButton}
			/>
			{props.children}
		</>
	);
};
