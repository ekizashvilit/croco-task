import styled from "styled-components";

const MainPageHeader = () => {
	return (
		<Header>
			<h1>Task Manager</h1>
		</Header>
	);
};

const Header = styled.header`
	text-align: center;
	color: #1f2937;
	padding-top: 1rem;
`;

export default MainPageHeader;
