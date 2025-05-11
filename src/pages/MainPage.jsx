import { Divider } from "antd";
import styled from "styled-components";

import TasksList from "../components/TasksList";
import { useTaskModal } from "../hooks/useTaskModal";
import TasksControls from "../components/TasksControls";
import { useTaskContext } from "../context/TaskContext";
import MainPageHeader from "../components/MainPageHeader";
import TaskFormModal from "../components/modals/TaskFormModal";

const MainPage = () => {
	const { addTask, editTask } = useTaskContext();
	const {
		closeModal,
		getInitialValues,
		getModalMode,
		isEditMode,
		isModalOpen,
		openAddModal,
		openEditModal,
	} = useTaskModal();

	const handleFormSubmit = (values) => {
		if (isEditMode) {
			editTask(isEditMode.id, values);
		} else {
			addTask(values);
		}
		closeModal();
	};

	return (
		<MainPageWrapper>
			<MainPageHeader />
			<Divider size="middle" />
			<TasksControls onAddTaskClick={openAddModal} />
			<Divider size="middle" />
			<TasksList onEditTask={openEditModal} />
			{isModalOpen && (
				<TaskFormModal
					key={isEditMode ? `edit-${isEditMode.id}` : "add"}
					isOpen={isModalOpen}
					onCancel={closeModal}
					onFormSubmit={handleFormSubmit}
					mode={getModalMode()}
					initialValues={getInitialValues()}
				/>
			)}
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
