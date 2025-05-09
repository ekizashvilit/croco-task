import { Divider } from "antd";
import styled from "styled-components";

import TasksList from "../components/TasksList";
import TasksControls from "../components/TasksControls";
import MainPageHeader from "../components/MainPageHeader";

const MainPage = () => {
	return (
		<MainPageWrapper>
			<MainPageHeader />
			<Divider size="middle" />
			<TasksControls />
			<Divider size="middle" />
			<TasksList />
		</MainPageWrapper>
	);
};

const MainPageWrapper = styled.div`
	width: 100%;
	max-width: 55rem;
	margin: 2rem;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	border-radius: 0.3rem;
`;

export default MainPage;
