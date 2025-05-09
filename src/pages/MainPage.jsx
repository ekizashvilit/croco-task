import styled from "styled-components";
import MainPageHeader from "../components/MainPageHeader";
import TasksControls from "../components/TasksControls";
import TasksTable from "../components/TasksTable";

const MainPage = () => {
	return (
		<MainPageWrapper>
			<MainPageHeader />
			<TasksControls />
			<TasksTable />
		</MainPageWrapper>
	);
};

const MainPageWrapper = styled.div`
	width: 100%;
	max-width: 50rem;
	margin: 2rem;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	border-radius: 0.3rem;
`;

export default MainPage;
