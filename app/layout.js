import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import "../styles/globals.css";

export default async function RootLayout({ children }) {
	return (
		<html className={``}>
			<body className='font-body'>{children}</body>
		</html>
	);
}
