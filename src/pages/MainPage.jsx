import { Divider } from "antd";
import styled from "styled-components";

import TasksList from "../components/TasksList";
import TasksControls from "../components/TasksControls";
import MainPageHeader from "../components/MainPageHeader";
import TaskFormModal from "../components/modals/TaskFormModal";
import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";

const MainPage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditMode, setIsEditMode] = useState(null);
	const { addTask, editTask } = useTaskContext();

	const handleOpenAddModal = () => {
		setIsEditMode(null);
		setIsModalOpen(true);
	};

	const handleOpenEditModal = (task) => {
		setIsEditMode(task);
		setIsModalOpen(true);
	};

	const handleModalCancel = () => {
		setIsModalOpen(false);
		setIsEditMode(null);
	};

	const handleFormSubmit = (values) => {
		if (isEditMode) {
			editTask(isEditMode.id, values);
		} else {
			addTask(values);
		}
		setIsModalOpen(false);
		setIsEditMode(null);
	};

	return (
		<MainPageWrapper>
			<MainPageHeader />
			<Divider size="middle" />
			<TasksControls onAddTaskClick={handleOpenAddModal} />
			<Divider size="middle" />
			<TasksList onEditTask={handleOpenEditModal} />
			{isModalOpen && (
				<TaskFormModal
					key={isEditMode ? `edit-${isEditMode.id}` : "add"}
					isOpen={isModalOpen}
					onCancel={handleModalCancel}
					onFormSubmit={handleFormSubmit}
					mode={isEditMode ? "edit" : "add"}
					initialValues={
						isEditMode
							? {
									title: isEditMode.title,
									description: isEditMode.description,
									priority: isEditMode.priority,
							  }
							: null
					}
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
