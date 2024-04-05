import { Heading } from "components/Heading";
// import { usePageContext } from "context/page";

export const PostTitle = ({ level, textAlign }) => {
	// const { title } = usePageContext();

	return <Heading content={"home"} level={level} textAlign={textAlign} />;
};
