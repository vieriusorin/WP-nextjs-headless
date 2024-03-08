import { config } from "@fortawesome/fontawesome-svg-core";
import { gql } from "@apollo/client";
import client from "client";

import { mapMainMenuItems } from "utils/mapMainMenuItems";
import { MainMenu } from "components/MainMenu";

import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import "../styles/globals.css";

const NAV_QUERY = gql`
	query MainMenuQuery {
		acfOptionsMainMenu {
			mainMenu {
				menuItems {
					menuItem {
						destination {
							... on Page {
								uri
							}
						}
						label
					}
					items {
						destination {
							... on Page {
								uri
							}
						}
						label
					}
				}
				callToActionButton {
					label
					destination {
						... on Page {
							uri
						}
					}
				}
			}
		}
	}
`;

const getData = async () => {
	const data = await client.query({
		query: NAV_QUERY,
	});

	return data;
};

export default async function RootLayout({ children }) {
	const { data } = await getData();

	const mainMenuItems = mapMainMenuItems(
		data.acfOptionsMainMenu.mainMenu.menuItems
	);

	const callToActionButton =
		data.acfOptionsMainMenu.mainMenu.callToActionButton;
	return (
		<html className={``}>
			<body className='font-body'>
				<MainMenu
					menuItems={mainMenuItems}
					callToActionButton={callToActionButton}
				/>
				{children}
			</body>
		</html>
	);
}
