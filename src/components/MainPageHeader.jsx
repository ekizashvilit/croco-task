import styled from "styled-components";

const MainPageHeader = () => {
	return (
		<Header>
			<h1>Task Manager</h1>
			<div></div>
		</Header>
	);
};

const Header = styled.header`
	text-align: center;
	color: #1f2937;
	padding: 1rem 0;
	div {
		width: 100%;
		height: 1px;
		margin-top: 1rem;
		background-color: #e5e7eb;
	}
`;

export default MainPageHeader;
