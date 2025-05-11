import { useState } from "react";

export const useTaskModal = () => {
	const [isEditMode, setIsEditMode] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openAddModal = () => {
		setIsEditMode(null);
		setIsModalOpen(true);
	};

	const openEditModal = (task) => {
		setIsEditMode(task);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setIsEditMode(null);
	};

	const getInitialValues = () =>
		isEditMode
			? {
					title: isEditMode.title,
					description: isEditMode.description,
					priority: isEditMode.priority,
					dueDate: isEditMode.dueDate,
			  }
			: null;

	const getModalMode = () => (isEditMode ? "edit" : "add");

	return {
		isModalOpen,
		isEditMode,
		openAddModal,
		openEditModal,
		closeModal,
		getInitialValues,
		getModalMode,
	};
};
